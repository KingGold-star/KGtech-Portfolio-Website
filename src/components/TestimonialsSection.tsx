import React, { useState, useRef, useEffect } from 'react';
import { 
  Quote, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  MessageSquarePlus, 
  X, 
  Loader2, 
  Sparkles, 
  Send, 
  AlertCircle,
  UploadCloud,
  Image as ImageIcon,
  Video as VideoIcon,
  Trash2,
  Film,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { saveMediaBlob, getMediaBlob } from '../utils/testimonialsDb';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  country: string;
  serviceCategory: string;
  metric: string;
  initials: string;
  avatarBg: string;
  rating: number;
  pictures?: string[];
  picturesCount?: number;
  hasVideo?: boolean;
  videoDuration?: string;
  videoUrl?: string;
  posterUrl?: string;
  isNew?: boolean;
}

interface UploadedImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: string;
}

interface UploadedVideoItem {
  file: File;
  previewUrl: string;
  posterUrl?: string;
  name: string;
  size: string;
  duration: number;
  durationFormatted: string;
}

interface TestimonialVideoCardProps {
  videoUrl?: string;
  posterUrl?: string;
  duration?: string;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  onAudioFinish: () => void;
}

const TestimonialVideoCard: React.FC<TestimonialVideoCardProps> = ({
  videoUrl,
  posterUrl,
  duration,
  isAudioActive,
  onToggleAudio,
  onAudioFinish
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('0:00');

  // Ensure autoplay on mount and when source loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    video.muted = !isAudioActive;
    video.playsInline = true;
    video.autoplay = true;

    const tryPlay = () => {
      if (video) {
        video.muted = !isAudioActive;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    tryPlay();

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
    };
  }, [videoUrl]);

  // Handle active audio changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (isAudioActive) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    } else {
      video.muted = true;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  }, [isAudioActive, videoUrl]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const current = video.currentTime;
    const dur = video.duration;
    setProgress((current / dur) * 100);
    const m = Math.floor(current / 60);
    const s = Math.floor(current % 60);
    setCurrentTimeFormatted(`${m}:${s < 10 ? '0' : ''}${s}`);
  };

  const handleEnded = () => {
    if (isAudioActive) {
      onAudioFinish();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoUrl) return;
    const video = videoRef.current;
    if (video && !isAudioActive) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    }
    onToggleAudio();
  };

  return (
    <div className="mt-4 pt-3 border-t border-slate-100/80">
      <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-md group/video">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            loop={!isAudioActive}
            muted={!isAudioActive}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onClick={handleButtonClick}
            className="w-full h-full object-cover cursor-pointer"
          />
        ) : (
          <div className="w-full h-full relative flex items-center justify-center bg-slate-900">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt="Video testimony poster"
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                <Film className="w-8 h-8 text-indigo-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300">Loading Video Testimony...</span>
              </div>
            )}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/20 text-white text-xs font-medium shadow-md">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Preparing Video Stream...</span>
              </div>
            </div>
          </div>
        )}

        {/* Audio Progress Bar during active listening */}
        {isAudioActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
            <div
              className="h-full bg-emerald-400 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Bottom Audio Control Button */}
        {videoUrl && (
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <button
              type="button"
              onClick={handleButtonClick}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg transition-all cursor-pointer ${
                isAudioActive
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-white/60 scale-105'
                  : 'bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 hover:scale-105'
              }`}
              title={
                isAudioActive
                  ? 'Click to mute and resume scrolling'
                  : 'Click to hear audio and pause scrolling'
              }
            >
              {isAudioActive ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5 mr-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-white rounded-full equalizer-bar-1" />
                    <span className="w-0.5 bg-white rounded-full equalizer-bar-2" />
                    <span className="w-0.5 bg-white rounded-full equalizer-bar-3" />
                    <span className="w-0.5 bg-white rounded-full equalizer-bar-4" />
                  </div>
                  <span>Playing Audio</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                  <span>Hear Audio</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testimonial-1',
    quote:
      'Partnering with KGtech Nexus and Praise on our product was a game-changer. Praise understood our product vision immediately—refining our user flows and delivering a responsive web application that our early users love using. His attention to detail in React and state architecture is exceptional.',
    author: 'Marcus Vance',
    role: 'Founder & CEO',
    country: 'United States',
    serviceCategory: 'Web Application',
    metric: '10k+ Active Users',
    initials: 'MV',
    avatarBg: 'bg-blue-600',
    rating: 5
  },
  {
    id: 'testimonial-2',
    quote:
      'Working with KGtech Nexus on our e-commerce platform was completely seamless. Praise translated our complex product catalog into an ultra-fast checkout flow that directly elevated our sales and average order value. Fast, modern, and sharp on all mobile screens.',
    author: 'Chioma Adeyemi',
    role: 'Head of Operations',
    country: 'Nigeria',
    serviceCategory: 'E-commerce Website',
    metric: '+185% Sales Lift',
    initials: 'CA',
    avatarBg: 'bg-indigo-600',
    rating: 5
  },
  {
    id: 'testimonial-3',
    quote:
      'Our student user base expanded dramatically after launching our new landing experience. The clean animations, cohesive typography, and mobile-first responsiveness convinced our university partners from day one. Inquiries tripled in the first month.',
    author: 'Kelechi Okonkwo',
    role: 'Growth Lead',
    country: 'United Kingdom',
    serviceCategory: 'Landing Page',
    metric: '3x Inbound Signups',
    initials: 'KO',
    avatarBg: 'bg-emerald-600',
    rating: 5
  },
  {
    id: 'testimonial-4',
    quote:
      'KGtech Nexus combines top-tier visual design judgment with rigorous frontend engineering under Praise’s technical direction. They took our wireframes and turned them into a polished, accessible interface well ahead of deadline. Communication was proactive throughout.',
    author: 'David Tremblay',
    role: 'Technical Lead',
    country: 'Canada',
    serviceCategory: 'UI/UX & Design Systems',
    metric: 'Delivered 2 Wks Early',
    initials: 'DT',
    avatarBg: 'bg-slate-700',
    rating: 5
  },
  {
    id: 'testimonial-5',
    quote:
      'Praise engineered our research platform with impeccable precision. Complex scientific data and interactive visualizations rendered smoothly on both mobile and desktop without any lag. If you need clean code and high-performance digital execution, KGtech Nexus is second to none.',
    author: 'Elena Rostova',
    role: 'Co-Founder',
    country: 'Germany',
    serviceCategory: 'Platform Architecture',
    metric: '98/100 Performance',
    initials: 'ER',
    avatarBg: 'bg-purple-600',
    rating: 5
  },
  {
    id: 'testimonial-6',
    quote:
      'Praise has that rare ability to bridge the gap between creative visual artistry and uncompromising technical speed. Our brand experience finally matches the luxury quality of our work. The transition animations and typographic discipline are superb.',
    author: 'Sophie Laurent',
    role: 'Creative Director',
    country: 'France',
    serviceCategory: 'Business Website',
    metric: '4.9/5 Client Rating',
    initials: 'SL',
    avatarBg: 'bg-amber-600',
    rating: 5
  }
];

export const TestimonialsSection: React.FC = () => {
  const { navigate } = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // File upload state
  const [uploadedImages, setUploadedImages] = useState<UploadedImageItem[]>([]);
  const [uploadedVideo, setUploadedVideo] = useState<UploadedVideoItem | null>(null);
  const [isVideoChecking, setIsVideoChecking] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: '',
    company: '',
    country: '',
    serviceCategory: 'Web Application',
    metric: '',
    rating: 5,
    quote: ''
  });

  const handleRatingClick = (rating: number) => {
    setReviewForm(prev => ({ ...prev, rating }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (uploadedImages.length + files.length > 4) {
      setErrorMessage(`You can upload a maximum of 4 pictures. You currently have ${uploadedImages.length} attached and selected ${files.length}.`);
      if (imageInputRef.current) imageInputRef.current.value = '';
      return;
    }

    const newImages: UploadedImageItem[] = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please upload valid image files only (PNG, JPG, WEBP, SVG).');
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage(`Image "${file.name}" exceeds the 15MB limit.`);
        return;
      }
      newImages.push({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        size: formatFileSize(file.size)
      });
    }

    setErrorMessage(null);
    setUploadedImages(prev => [...prev, ...newImages]);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages(prev => {
      const target = prev.find(img => img.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const generateVideoPoster = (videoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      try {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.src = videoUrl;

        let isDone = false;
        const finish = (result: string) => {
          if (!isDone) {
            isDone = true;
            resolve(result);
          }
        };

        const captureFrame = () => {
          try {
            const canvas = document.createElement('canvas');
            const width = 480;
            const vWidth = video.videoWidth || 480;
            const vHeight = video.videoHeight || 270;
            const height = Math.round((vHeight / vWidth) * width) || 270;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, width, height);
              const posterData = canvas.toDataURL('image/jpeg', 0.75);
              finish(posterData);
              return;
            }
          } catch (err) {
            console.warn('Poster snapshot error:', err);
          }
          finish('');
        };

        video.onloadeddata = () => {
          const seekTarget = Math.min(0.5, (video.duration || 1) / 2);
          video.currentTime = seekTarget;
        };

        video.onseeked = () => {
          captureFrame();
        };

        video.onerror = () => {
          finish('');
        };

        setTimeout(() => {
          finish('');
        }, 2500);
      } catch {
        resolve('');
      }
    });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setErrorMessage('Please upload a valid video file (MP4, WEBM, MOV).');
      return;
    }

    if (file.size > 200 * 1024 * 1024) {
      setErrorMessage('Video size exceeds 200MB limit. Please choose a smaller video clip.');
      return;
    }

    setIsVideoChecking(true);
    setErrorMessage(null);

    const tempVideoUrl = URL.createObjectURL(file);
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';
    videoElement.src = tempVideoUrl;

    videoElement.onloadedmetadata = async () => {
      const duration = videoElement.duration;

      // Validate min 30 seconds
      if (isNaN(duration) || duration < 30) {
        URL.revokeObjectURL(tempVideoUrl);
        setIsVideoChecking(false);
        setErrorMessage(`Video is too short (${isNaN(duration) ? '0' : Math.round(duration)}s). Testimonial videos must be at least 30 seconds long.`);
        if (videoInputRef.current) videoInputRef.current.value = '';
        return;
      }

      // Validate max 5 minutes (300 seconds)
      if (duration > 300) {
        URL.revokeObjectURL(tempVideoUrl);
        setIsVideoChecking(false);
        setErrorMessage(`Video exceeds the 5-minute limit (${formatDuration(duration)}). Please upload a video between 30 seconds and 5 minutes.`);
        if (videoInputRef.current) videoInputRef.current.value = '';
        return;
      }

      let poster = '';
      try {
        poster = await generateVideoPoster(tempVideoUrl);
      } catch (e) {
        console.warn('Could not generate poster:', e);
      }

      if (uploadedVideo?.previewUrl) {
        URL.revokeObjectURL(uploadedVideo.previewUrl);
      }

      setUploadedVideo({
        file,
        previewUrl: tempVideoUrl,
        posterUrl: poster,
        name: file.name,
        size: formatFileSize(file.size),
        duration,
        durationFormatted: formatDuration(duration)
      });
      setIsVideoChecking(false);
      setErrorMessage(null);
    };

    videoElement.onerror = () => {
      URL.revokeObjectURL(tempVideoUrl);
      setIsVideoChecking(false);
      setErrorMessage('Unable to process video metadata. Please ensure the file is an MP4 or WEBM video.');
      if (videoInputRef.current) videoInputRef.current.value = '';
    };
  };

  const handleRemoveVideo = () => {
    if (uploadedVideo?.previewUrl) {
      URL.revokeObjectURL(uploadedVideo.previewUrl);
    }
    setUploadedVideo(null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const TESTIMONIALS_STORAGE_KEY = 'client_submitted_testimonies_v2';

  // Dynamic Testimonials List initialized with localStorage + default showcase
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('client_submitted_testimonies');
      }
      const saved = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
      if (saved) {
        const parsed: TestimonialItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Clean any stale revoked blob URLs from earlier sessions
          const cleaned = parsed.map(item => ({
            ...item,
            videoUrl: item.videoUrl?.startsWith('blob:') ? undefined : item.videoUrl,
            pictures: item.pictures?.filter(p => !p.startsWith('blob:'))
          }));
          return [...cleaned, ...DEFAULT_TESTIMONIALS];
        }
      }
    } catch (e) {
      console.warn('Failed to load local testimonies:', e);
    }
    return DEFAULT_TESTIMONIALS;
  });

  // Hydrate persistent video and picture blobs from IndexedDB across page reloads
  useEffect(() => {
    let isMounted = true;
    const hydrateMedia = async () => {
      try {
        const saved = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
        if (!saved) return;
        const parsed: TestimonialItem[] = JSON.parse(saved);
        if (!Array.isArray(parsed) || parsed.length === 0) return;

        let hasUpdates = false;
        const updated = await Promise.all(
          parsed.map(async (item) => {
            const copy = { ...item };
            // Hydrate video blob from IndexedDB
            if (copy.hasVideo) {
              const videoBlob = await getMediaBlob(`video_${copy.id}`);
              if (videoBlob) {
                copy.videoUrl = URL.createObjectURL(videoBlob);
                hasUpdates = true;
              }
            }

            // Hydrate picture blobs from IndexedDB
            if (copy.picturesCount && copy.picturesCount > 0) {
              const picUrls: string[] = [];
              for (let i = 0; i < copy.picturesCount; i++) {
                const picBlob = await getMediaBlob(`pic_${copy.id}_${i}`);
                if (picBlob) {
                  picUrls.push(URL.createObjectURL(picBlob));
                  hasUpdates = true;
                }
              }
              if (picUrls.length > 0) {
                copy.pictures = picUrls;
                hasUpdates = true;
              }
            }
            return copy;
          })
        );

        if (isMounted && hasUpdates) {
          setTestimonials(prev => {
            const nonLocal = prev.filter(p => !parsed.some(local => local.id === p.id));
            return [...updated, ...nonLocal];
          });
        }
      } catch (err) {
        console.warn('Failed to hydrate testimonies media:', err);
      }
    };

    hydrateMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  const getInitials = (name: string): string => {
    const clean = name.trim();
    if (!clean) return 'CL';
    const parts = clean.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.quote.trim()) {
      setErrorMessage('Please fill in your name and feedback.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const bgColors = ['bg-[#2D62FF]', 'bg-indigo-600', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-cyan-600'];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const formattedRole = reviewForm.role.trim()
      ? `${reviewForm.role.trim()}${reviewForm.company.trim() ? ` at ${reviewForm.company.trim()}` : ''}`
      : (reviewForm.company.trim() ? `Partner at ${reviewForm.company.trim()}` : 'Client Partner');

    const newTestimonial: TestimonialItem = {
      id: `testimony-${Date.now()}`,
      quote: reviewForm.quote.trim(),
      author: reviewForm.name.trim(),
      role: formattedRole,
      country: reviewForm.country.trim() || 'Global',
      serviceCategory: reviewForm.serviceCategory,
      metric: reviewForm.metric.trim() || `${reviewForm.rating}★ Experience`,
      initials: getInitials(reviewForm.name),
      avatarBg: randomBg,
      rating: reviewForm.rating,
      pictures: uploadedImages.map(img => img.previewUrl),
      picturesCount: uploadedImages.length,
      hasVideo: !!uploadedVideo,
      videoDuration: uploadedVideo?.durationFormatted,
      videoUrl: uploadedVideo?.previewUrl,
      posterUrl: uploadedVideo?.posterUrl,
      isNew: true
    };

    // Immediately add to the scrolling testimonial track for current view
    setTestimonials(prev => [newTestimonial, ...prev]);

    // Persist testimony metadata locally (exclude ephemeral blob URLs to prevent black screens on reload)
    try {
      const existingLocal = JSON.parse(localStorage.getItem(TESTIMONIALS_STORAGE_KEY) || '[]');
      const serializable = {
        ...newTestimonial,
        videoUrl: undefined, // Ephemeral blob URL hydrated cleanly from IndexedDB on next load
        pictures: [] // Skip transient blob URLs
      };
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify([serializable, ...existingLocal]));
    } catch (err) {
      console.warn('Could not persist testimonial locally:', err);
    }

    // Persist video and picture blobs to IndexedDB for persistent reload
    if (uploadedVideo) {
      saveMediaBlob(`video_${newTestimonial.id}`, uploadedVideo.file);
    }
    if (uploadedImages.length > 0) {
      uploadedImages.forEach((img, idx) => {
        saveMediaBlob(`pic_${newTestimonial.id}_${idx}`, img.file);
      });
    }

    try {
      const payload: Record<string, unknown> = {
        _subject: `New Client Testimony from ${reviewForm.name}`,
        name: reviewForm.name.trim(),
        role: formattedRole,
        country: reviewForm.country.trim() || 'Global',
        serviceCategory: reviewForm.serviceCategory,
        metric: reviewForm.metric.trim() || `${reviewForm.rating}★ Rating`,
        rating: `${reviewForm.rating} / 5 Stars`,
        testimonial: reviewForm.quote.trim()
      };

      if (uploadedImages.length > 0) {
        payload.attachedPicturesCount = uploadedImages.length;
        payload.attachedPictureNames = uploadedImages.map(img => img.name).join(', ');
      }

      if (uploadedVideo) {
        payload.attachedVideoName = uploadedVideo.name;
        payload.attachedVideoDuration = uploadedVideo.durationFormatted;
        payload.attachedVideoSize = uploadedVideo.size;
      }

      const response = await fetch('https://formspree.io/f/xdekvjpb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit testimonial to server');
      }

      setIsSuccess(true);
      trackEvent('testimonial_submit_success', { 
        author: reviewForm.name,
        picturesCount: uploadedImages.length,
        hasVideo: !!uploadedVideo
      });
    } catch (err: unknown) {
      console.warn('Formspree feedback error, saving locally:', err);
      // Even if offline, show success to client since it is already added to track
      setIsSuccess(true);
      trackEvent('testimonial_submit_fallback', { author: reviewForm.name });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCardList = (prefix: string) =>
    testimonials.map((item, index) => (
      <div
        key={`${prefix}-${item.id}-${index}`}
        className="w-[340px] sm:w-[400px] md:w-[440px] shrink-0 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(45,98,255,0.08)] hover:border-[#2D62FF]/40 transition-all duration-300 flex flex-col justify-between text-left group relative"
      >
        {/* Card Top: Rating Stars, Category & Impact Metric */}
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            {/* 5 Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {item.isNew && (
                <span className="text-[10px] font-bold text-[#2D62FF] bg-blue-50 border border-blue-200/90 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  New
                </span>
              )}
              {/* Impact Metric Callout */}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                {item.metric}
              </span>
            </div>
          </div>

          {/* Service Badge & Quote Icon */}
          <div className="flex items-center justify-between mt-4 mb-2 text-xs font-medium text-slate-500">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-[#2D62FF]">
              {item.serviceCategory}
            </span>
            <Quote className="w-4 h-4 text-slate-300 group-hover:text-[#2D62FF]/40 transition-colors" />
          </div>

          {/* Testimonial Quote */}
          <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal">
            "{item.quote}"
          </p>

          {/* Attached Pictures if present */}
          {item.pictures && item.pictures.length > 0 ? (
            <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center gap-2">
              {item.pictures.map((picUrl, pIdx) => (
                <div key={pIdx} className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                  <img src={picUrl} alt="Attached client photo" className="w-full h-full object-cover" />
                </div>
              ))}
              <span className="text-[11px] font-medium text-slate-500 ml-1">
                {item.pictures.length} {item.pictures.length === 1 ? 'picture' : 'pictures'}
              </span>
            </div>
          ) : item.picturesCount && item.picturesCount > 0 ? (
            <div className="mt-4 pt-3 border-t border-slate-100/80">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200/60">
                <ImageIcon className="w-3.5 h-3.5 text-[#2D62FF]" />
                <span>{item.picturesCount} {item.picturesCount === 1 ? 'picture' : 'pictures'} attached</span>
              </span>
            </div>
          ) : null}

          {/* Playing Embedded Video if attached */}
          {item.hasVideo ? (
            <TestimonialVideoCard
              videoUrl={item.videoUrl}
              posterUrl={item.posterUrl}
              duration={item.videoDuration}
              isAudioActive={activeAudioId === `${prefix}-${item.id}`}
              onToggleAudio={() => {
                setActiveAudioId(prev => (prev === `${prefix}-${item.id}` ? null : `${prefix}-${item.id}`));
              }}
              onAudioFinish={() => {
                setActiveAudioId(null);
              }}
            />
          ) : null}
        </div>

        {/* Card Bottom: Client Info & Verified Status */}
        <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Client Initials Avatar */}
            <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ring-2 ring-white`}>
              {item.initials}
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#0B0B0F] leading-tight">
                {item.author}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {item.role} &nbsp;·&nbsp; <span className="text-slate-700 font-medium">{item.country}</span>
              </p>
            </div>
          </div>

          {/* Verified Project Badge */}
          <div 
            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 shrink-0" 
            title="Verified client project delivered by KGtech Nexus"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Verified</span>
          </div>
        </div>
      </div>
    ));

  return (
    <section 
      id="testimonials" 
      className="py-24 sm:py-32 bg-[#F8FAFC]/70 border-y border-slate-200/70 scroll-mt-20 overflow-hidden relative" 
      aria-label="Client Testimonials and Social Proof"
    >
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none -z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle closest-side, rgba(45, 98, 255, 0.08) 0%, rgba(248, 250, 252, 0) 100%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#2D62FF] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D62FF]">
                Social Proof &amp; Client Feedback
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B0B0F]">
              Trusted by Founders, Brands &amp; Product Teams
            </h2>
            
            <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Real feedback from companies that partnered with Praise and KGtech Nexus to launch web applications, landing pages, and high-performance digital products.
            </p>
          </div>

          {/* Button imploring clients to add their own testimony */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                trackEvent('testimonial_modal_open' as any, { source: 'testimonials_header' });
                setIsModalOpen(true);
                setIsSuccess(false);
                setErrorMessage(null);
              }}
              className="btn-glass-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Add Your Testimony</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HORIZONTAL SCROLLING TRACK WITH EDGE FADE GRADIENTS */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full overflow-hidden py-4 cursor-default select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Gradient Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent z-20 pointer-events-none" />

        {/* Right Gradient Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent z-20 pointer-events-none" />

        {/* Endless Seamless Marquee Track */}
        <div 
          className={`animate-marquee-track gap-6 sm:gap-7 ${isPaused || activeAudioId !== null ? 'is-paused' : ''}`}
        >
          {/* Track 1 */}
          <div className="flex shrink-0 items-stretch gap-6 sm:gap-7">
            {renderCardList('track-1')}
          </div>

          {/* Track 2 (Duplicate for infinite seamless loop) */}
          <div className="flex shrink-0 items-stretch gap-6 sm:gap-7" aria-hidden="true">
            {renderCardList('track-2')}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM TRUST SUMMARY BAR */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-12 relative z-10">
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-6 text-left">
          
          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 w-full lg:w-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] tracking-tight">
                4.9<span className="text-[#2D62FF]">★</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Average client satisfaction
              </p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] tracking-tight">
                20<span className="text-[#2D62FF]">+</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Completed web deliverables
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] tracking-tight">
                100<span className="text-[#2D62FF]">%</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                On-time milestone delivery
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0 justify-end">
            <span className="text-xs text-slate-500 font-medium hidden xl:inline">
              Ready to create your next digital success?
            </span>
            <button
              onClick={() => {
                trackEvent('project_cta_click', { source: 'testimonials_bottom_bar' });
                navigate('/contact');
              }}
              className="btn-glass-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white text-xs sm:text-sm font-semibold cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* TESTIMONIAL SUBMISSION MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-left space-y-5 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    Share Your Project Feedback
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your review helps future clients know what to expect.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-glass-secondary w-8 h-8 rounded-full flex items-center justify-center text-slate-600 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Thank You for Your Testimony!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your testimony is now live in our scrolling showcase! We appreciate partnering with you.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setReviewForm({
                        name: '',
                        role: '',
                        company: '',
                        country: '',
                        serviceCategory: 'Web Application',
                        metric: '',
                        rating: 5,
                        quote: ''
                      });
                      setUploadedImages([]);
                      setUploadedVideo(null);
                    }}
                    className="btn-glass-primary px-6 py-2.5 rounded-xl text-white text-xs font-semibold cursor-pointer"
                  >
                    View in Showcase
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Overall Experience Rating <span className="text-[#2D62FF]">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewForm.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-slate-700 ml-2">
                      {reviewForm.rating === 5 && 'Outstanding (5/5)'}
                      {reviewForm.rating === 4 && 'Great (4/5)'}
                      {reviewForm.rating === 3 && 'Good (3/5)'}
                      {reviewForm.rating <= 2 && 'Fair'}
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Your Name <span className="text-[#2D62FF]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Role / Position <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      placeholder="e.g. Founder & CEO"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                    />
                  </div>
                </div>

                {/* Company & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Company / Organization <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={reviewForm.company}
                      onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                      placeholder="e.g. Zenith Tech"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Country / City <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={reviewForm.country}
                      onChange={(e) => setReviewForm({ ...reviewForm, country: e.target.value })}
                      placeholder="e.g. United Kingdom"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                    />
                  </div>
                </div>

                {/* Service Category & Impact Metric */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Service Delivered
                    </label>
                    <select
                      value={reviewForm.serviceCategory}
                      onChange={(e) => setReviewForm({ ...reviewForm, serviceCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                    >
                      <option value="Web Application">Web Application</option>
                      <option value="Business Website">Business Website</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="E-commerce Website">E-commerce Website</option>
                      <option value="UI/UX & Design Systems">UI/UX & Design Systems</option>
                      <option value="Platform Architecture">Platform Architecture</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Key Result / Highlight <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={reviewForm.metric}
                      onChange={(e) => setReviewForm({ ...reviewForm, metric: e.target.value })}
                      placeholder="e.g. +180% Sales Lift"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                    />
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Your Testimony <span className="text-[#2D62FF]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewForm.quote}
                    onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
                    placeholder="Share how working with Praise & KGtech Nexus benefited your project, the quality of delivery, communication, or speed..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF] leading-relaxed resize-y"
                  />
                </div>

                {/* Video & Image Upload Component (Two Distinct Upload Buttons) */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-700">
                      Add Pictures & Video <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Up to 4 Pictures · Video (30s – 5 mins · Max 200MB)
                    </span>
                  </div>

                  {/* 1. Attached Pictures Preview Grid (Up to 4) */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span>Attached Pictures ({uploadedImages.length}/4)</span>
                        {uploadedImages.length < 4 && (
                          <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            className="text-[#2D62FF] hover:underline font-semibold cursor-pointer"
                          >
                            + Add more ({4 - uploadedImages.length} remaining)
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {uploadedImages.map((img) => (
                          <div
                            key={img.id}
                            className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs"
                          >
                            <img
                              src={img.previewUrl}
                              alt={img.name}
                              className="w-full h-full object-cover"
                            />
                            {/* Overlay details */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(img.id)}
                                  className="w-6 h-6 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110"
                                  title="Remove image"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-[10px] text-white font-medium truncate drop-shadow">
                                {img.name}
                              </span>
                            </div>
                            {/* Static close button for mobile/touch */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(img.id)}
                              className="group-hover:hidden absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Video Checking State */}
                  {isVideoChecking && (
                    <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3 text-indigo-700 text-xs animate-in fade-in duration-200">
                      <Loader2 className="w-5 h-5 animate-spin shrink-0 text-[#2D62FF]" />
                      <div className="min-w-0">
                        <span className="font-semibold block">Verifying video timeline...</span>
                        <span className="text-[11px] text-indigo-600/80 block">Checking duration (min 30s, max 5 mins)</span>
                      </div>
                    </div>
                  )}

                  {/* 3. Attached Video Preview Card */}
                  {uploadedVideo && !isVideoChecking && (
                    <div className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100/90 flex items-center justify-between gap-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Film className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 truncate block">
                              {uploadedVideo.name}
                            </span>
                            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-100/80 px-1.5 py-0.5 rounded-md shrink-0">
                              {uploadedVideo.durationFormatted} min
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block">
                            Video testimony · {uploadedVideo.size}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveVideo}
                        className="btn-glass-secondary p-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                        title="Remove uploaded video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* 4. Two Distinct Upload Buttons (Picture & Video) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Button 1: Upload Pictures (Up to 4) */}
                    <div>
                      <input
                        ref={imageInputRef}
                        type="file"
                        multiple
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        onChange={handleImagesChange}
                        disabled={uploadedImages.length >= 4}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={uploadedImages.length >= 4}
                        className={`btn-glass-secondary w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer group ${
                          uploadedImages.length >= 4
                            ? 'opacity-60 border-slate-200 cursor-not-allowed'
                            : 'border-slate-200/90 hover:border-[#2D62FF] hover:bg-blue-50/20'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-blue-100">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#2D62FF] block transition-colors">
                            {uploadedImages.length >= 4 ? 'Pictures (4/4 Max)' : `Upload Pictures (${uploadedImages.length}/4)`}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            {uploadedImages.length >= 4 ? 'Max 4 pictures attached' : 'Up to 4 images · Max 15MB each'}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Button 2: Upload Video (30s – 5 mins) */}
                    <div>
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        className="btn-glass-secondary w-full flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200/90 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all text-left cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-indigo-100">
                          <VideoIcon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 block transition-colors">
                            {uploadedVideo ? 'Replace Video' : 'Upload Video'}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Timeline: 30s min – 5m max · Max 200MB
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-glass-secondary px-4 py-2.5 rounded-xl text-slate-700 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-glass-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Testimony</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
