import React from 'react';

interface SpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    dotCount?: number;
}

const sizeMap = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
};

const Spinner: React.FC<SpinnerProps> = ({
    size = 'medium',
    color = 'bg-blue-600',
    dotCount = 10,
}) => {
    const dotSize = sizeMap[size];

    const dots = Array.from({ length: dotCount }, (_, i) => {
        const angle = (360 / dotCount) * i;
        const style = {
            transform: `rotate(${angle}deg) translate(2.5rem) rotate(-${angle}deg)`,
            animationDelay: `${(i / dotCount)}s`,
        };
        return (
            <span
                key={i}
                className={`absolute top-1/2 left-1/2 ${dotSize} ${color} rounded-full opacity-30 animate-dot-spin`}
                style={style}
            />
        );
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="relative w-20 h-20">
                {dots}
            </div>

            <style>{`
        @keyframes dot-spin {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        .animate-dot-spin {
          animation: dot-spin 1s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default Spinner;
