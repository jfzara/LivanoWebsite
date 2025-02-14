class VideoPlayer {
    private videos: HTMLVideoElement[];
    private currentIndex: number;
    private isTransitioning: boolean;
    private readonly TRANSITION_DURATION = 1000;

    constructor() {
        this.videos = Array.from(document.querySelectorAll('.phone-video'));
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.init();
    }

    private init(): void {
        if (this.videos.length === 0) return;

        this.setupVideos();
        this.preloadAllVideos();
        void this.playFirstVideo();
    }

    private setupVideos(): void {
        this.videos.forEach((video, index) => {
            video.loop = false;
            video.preload = 'auto';
            video.muted = true;
            video.playsInline = true;
            
            if (index === 0) {
                video.style.opacity = '1';
                video.style.transform = 'translateY(0)';
            } else {
                video.style.transform = 'translateY(100%)';
                video.style.opacity = '0';
            }

            // Ajouter un écouteur pour la fin de chaque vidéo
            video.addEventListener('timeupdate', () => {
                // Déclencher la transition juste avant la fin de la vidéo.
                if (video.currentTime >= video.duration - 0.1 && !this.isTransitioning) {
                    void this.switchVideo();
                }
            });
        });
    }

    private preloadAllVideos(): void {
        this.videos.forEach(video => {
            video.load();
        });
    }

    private async playFirstVideo(): Promise<void> {
        const firstVideo = this.videos[0];
        try {
            await firstVideo.play();
        } catch (error) {
            console.error('Initial playback failed:', error);
            const playOnInteraction = async (): Promise<void> => {
                try {
                    await firstVideo.play();
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                } catch (e) {
                    console.error('Playback failed after interaction:', e);
                }
            };
            document.addEventListener('touchstart', playOnInteraction);
            document.addEventListener('click', playOnInteraction);
        }
    }

    private async switchVideo(): Promise<void> {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const currentVideo = this.videos[this.currentIndex];
        const nextIndex = (this.currentIndex + 1) % this.videos.length;
        const nextVideo = this.videos[nextIndex];

        try {
            // Prépare la prochaine vidéo
            nextVideo.currentTime = 0;
            nextVideo.style.transition = 'none';
            nextVideo.style.transform = 'translateY(100%)';
            nextVideo.style.opacity = '1';

            // Démarre la lecture de la prochaine vidéo
            await nextVideo.play();

            // Applique la transition
            requestAnimationFrame(() => {
                currentVideo.style.transition = `transform ${this.TRANSITION_DURATION}ms ease-out`;
                nextVideo.style.transition = `transform ${this.TRANSITION_DURATION}ms ease-out`;
                
                currentVideo.style.transform = 'translateY(-100%)';
                nextVideo.style.transform = 'translateY(0)';
            });

            // Met à jour l'index
            this.currentIndex = nextIndex;

            // Nettoie après la transition
            setTimeout(() => {
                currentVideo.style.opacity = '0';
                currentVideo.style.transform = 'translateY(100%)';
                currentVideo.style.transition = 'none';
                this.isTransitioning = false;
            }, this.TRANSITION_DURATION);

        } catch (error) {
            console.error('Video transition failed:', error);
            this.isTransitioning = false;
        }
    }
}

// Initialise le lecteur vidéo quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VideoPlayer());
} else {
    new VideoPlayer();
}