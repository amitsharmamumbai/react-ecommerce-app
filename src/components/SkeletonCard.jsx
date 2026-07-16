
export default function SkeletonCard(){
    return(
        <div className="relative border rounded-lg p-4 shadow animate-pulse">

            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            </div>

            <div className="w-full h-40 mb-3 bg-gray-100 rounded-md">

            </div>
            <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>  

            <div className="h-6 w-20 bg-gray-200 rounded-md mt-4"></div>

            <div className="h-10 w-full bg-gray-200 rounded-md mt-4"></div>

        </div>
    );
}