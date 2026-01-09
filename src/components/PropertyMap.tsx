import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

interface PropertyMapProps {
    address: {
        street: string;
        neighborhood: string;
        city: string;
        state: string;
    };
    coordinates?: {
        lat: number;
        lng: number;
    };
}

const PropertyMap = ({ address, coordinates }: PropertyMapProps) => {
    const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}`;

    // Default coordinates for Porto Alegre if not provided
    const lat = coordinates?.lat || -30.0346;
    const lng = coordinates?.lng || -51.2177;

    // OpenStreetMap embed URL
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`;

    // Google Maps directions URL
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    // Google Maps search URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl overflow-hidden border border-border"
        >
            {/* Map Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                    <MapPin size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Localização</h3>
                </div>
                <p className="text-sm text-muted-foreground">{fullAddress}</p>
            </div>

            {/* Map */}
            <div className="relative aspect-video bg-muted">
                <iframe
                    title="Mapa do Imóvel"
                    src={mapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Loading overlay with skeleton */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: 2, ease: "linear" }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 flex gap-3">
                <motion.a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm"
                >
                    <Navigation size={16} />
                    Como Chegar
                </motion.a>

                <motion.a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm"
                >
                    <ExternalLink size={16} />
                    Ver no Maps
                </motion.a>
            </div>
        </motion.div>
    );
};

export default PropertyMap;
