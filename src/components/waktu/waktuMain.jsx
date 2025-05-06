export default function WaktuMain({ timeLeft, totalTime = 30 }) {
    const percentage = (timeLeft / totalTime) * 100;
    const isDanger = timeLeft <= 5;

    return (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-11/12 max-w-2xl z-50">
            <div className="relative bg-yellow-200 rounded-full h-6 overflow-hidden shadow-lg border-4 border-white">
                <div
                    className={`h-full transition-all duration-1000 ease-linear ${
                        isDanger ? "bg-red-600 animate-pulse" : "bg-green-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black font-bold text-lg tracking-wide">
                        ⏰ {timeLeft > 0 ? timeLeft : 0} detik
                    </span>
                </div>
            </div>
        </div>
    );
}
