class VideoPlayer {
    private videos: HTMLVideoElement[];
    private currentIndex: number;
    private isTransitioning: boolean;
    private readonly VIDEO_DURATION = 2000;

    constructor() {
        this.videos = Array.from(document.querySelectorAll('.phone-video'));
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.init();
    }

    private init(): void {
        if (this.videos.length === 0) return;

        const placeholder = document.querySelector('.placeholder-image');
        if (placeholder) {
            placeholder.remove();
        }

        this.setupVideos();
        this.preloadNextVideo(0);
        setTimeout(() => this.startVideoSequence(), 500);
    }

    private setupVideos(): void {
        this.videos.forEach((video, index) => {
            video.loop = false; // Désactive la boucle pour contrôler précisément la durée
            if (index === 0) {
                video.classList.add('active');
                this.setupFirstVideo(video);
            } else {
                this.setupOtherVideo(video);
            }
        });
    }

    private setupFirstVideo(video: HTMLVideoElement): void {
        video.style.transform = 'translateY(0)';
        video.style.opacity = '1';
        video.load();
        video.play().catch(console.error);
    }

    private setupOtherVideo(video: HTMLVideoElement): void {
        video.style.transform = 'translateY(100%)';
        video.style.opacity = '0';
        video.load();
    }

    private preloadNextVideo(index: number): void {
        const nextIndex = (index + 1) % this.videos.length;
        const nextVideo = this.videos[nextIndex];
        if (nextVideo?.preload === 'none') {
            nextVideo.preload = 'auto';
        }
    }

    private startVideoSequence(): void {
        this.playNextVideo();
    }

    private async playNextVideo(): Promise<void> {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const currentVideo = this.videos[this.currentIndex];
        const nextIndex = (this.currentIndex + 1) % this.videos.length;
        const nextVideo = this.videos[nextIndex];

        try {
            // Prépare la prochaine vidéo
            nextVideo.currentTime = 0;
            nextVideo.style.transform = 'translateY(100%)';
            nextVideo.style.opacity = '1';
            await nextVideo.play();

            // Anime la transition
            requestAnimationFrame(() => {
                currentVideo.style.transition = 'transform 1s ease-out';
                nextVideo.style.transition = 'transform 1s ease-out';
                
                currentVideo.style.transform = 'translateY(-100%)';
                nextVideo.style.transform = 'translateY(0)';
            });

            this.currentIndex = nextIndex;

            // Gestion de la fin de la transition
            setTimeout(() => {
                this.isTransitioning = false;
                currentVideo.style.opacity = '0';
                currentVideo.style.transform = 'translateY(100%)';
                currentVideo.style.transition = 'none';
                this.preloadNextVideo(nextIndex);

                // Gestion spéciale pour la dernière vidéo
                if (this.currentIndex === this.videos.length - 1) {
                    // Attend la fin naturelle de la vidéo
                    nextVideo.addEventListener('ended', () => {
                        nextVideo.currentTime = 0; // Réinitialise la vidéo
                        this.playNextVideo();
                    }, { once: true });
                } else {
                    // Pour les autres vidéos, utilise la durée fixe
                    setTimeout(() => {
                        this.playNextVideo();
                    }, this.VIDEO_DURATION);
                }
            }, 1000);

        } catch (error) {
            console.error('Error during video transition:', error);
            this.isTransitioning = false;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VideoPlayer());
} else {
    new VideoPlayer();
}