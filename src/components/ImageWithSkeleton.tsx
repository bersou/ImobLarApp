import { useState } from "react";
import { motion } from "framer-motion";

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: "square" | "video" | "wide";
}

const ImageWithSkeleton = ({
    src,
    alt,
    className = "",
    aspectRatio = "video"
}: ImageWithSkeletonProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const aspectClasses = {
        square: "aspect-square",
        video: "aspect-video",
        wide: "aspect-[21/9]",
    };

    return (
        <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]} ${className}`}>
            {/* Skeleton loader */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted"
                    style={{
                        backgroundSize: "200% 100%",
                    }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                            x: ["-100%", "100%"],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </motion.div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground text-sm">Erro ao carregar</span>
                </div>
            )}

            {/* Actual image */}
            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                className={`w-full h-full object-cover ${isLoading ? "invisible" : "visible"}`}
            />
        </div>
    );
};

export default ImageWithSkeleton;
