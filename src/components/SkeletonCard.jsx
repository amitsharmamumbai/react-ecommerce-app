import "../styles/shimmer.css";

export default function SkeletonCard(){
    return(
        <div className="shimmer relative border rounded-lg p-4 shadow">

            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                <div className="placeholder w-4 h-4 rounded-full"></div>
            </div>

            <div className="placeholder w-full h-40 mb-3 rounded-md">

            </div>
            <div className="placeholder h-4 w-full rounded-md mb-2"></div>
            <div className="placeholder h-4 w-3/4 rounded-md"></div>  

            <div className="placeholder h-6 w-20 rounded-md mt-4"></div>

            <div className="placeholder h-10 w-full rounded-md mt-4"></div>

        </div>
    );
}