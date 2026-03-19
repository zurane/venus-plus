import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function SkeletonLoader(props) {
    return (
        <SkeletonTheme
            duration={1.8}
            direction="ltr"
            enableAnimation={true}
            baseColor="rgba(255,255,255,0.06)"
            highlightColor="rgba(255,255,255,0.18)"
            customHighlightBackground={`
                linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255,255,255,0.08) 25%,
                    rgba(255,255,255,0.25) 50%,
                    rgba(255,255,255,0.08) 75%,
                    transparent 100%
                )
            `}
        >
            <div className="max-w-6xl m-auto px-4 py-8">
                <div>
                    <Skeleton width={200} height={30} className="mb-3 skeleton opacity-80" />
                    <Skeleton width={150} height={20} className="skeleton opacity-70" />
                </div>

                <div className="grid grid-cols-3 gap-5 py-5 my-5">
                    <div className="p-4 rounded glassmorphism h-[120px] shadow-inner">
                        <Skeleton width={150} height={20} className="mb-2 skeleton opacity-80" />
                        <Skeleton width={100} height={30} className="skeleton opacity-60" />
                    </div>
                    <div className="p-4 rounded glassmorphism h-[120px] shadow-inner">
                        <Skeleton width={150} height={20} className="mb-2 skeleton opacity-80" />
                        <Skeleton width={100} height={30} className="skeleton opacity-60" />
                    </div>
                    <div className="p-4 rounded glassmorphism h-[120px] shadow-inner">
                        <Skeleton width={150} height={20} className="mb-2 skeleton opacity-80" />
                        <Skeleton width={100} height={30} className="skeleton opacity-60" />
                    </div>
                </div>

                <div className="p-4 rounded h-[400px] overflow-auto glassmorphism">
                    <Skeleton width={200} height={30} className="mb-3 skeleton opacity-80" />

                    {props.subscriptions && props.subscriptions.length === 0 ? (
                        <Skeleton width={200} height={20} className="skeleton opacity-70" />
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                    </th>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                    </th>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                    </th>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.subscriptions &&
                                    props.subscriptions.map((sub) => (
                                        <tr className="border-b border-white/20" key={sub.id}>
                                            <td className="p-2">
                                                <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                            </td>
                                            <td className="p-2">
                                                <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                            </td>
                                            <td className="p-2">
                                                <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                            </td>
                                            <td className="p-2">
                                                <Skeleton width={100} height={20} className="skeleton opacity-70" />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </SkeletonTheme>
    );
}