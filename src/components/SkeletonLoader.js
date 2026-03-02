import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function SkeletonLoader(props) {

    return (
        <SkeletonTheme
            duration={1.5}
            direction="ltr"
            enableAnimation={true}
        >
            <div className="max-w-6xl m-auto px-4 py-8">
                <div>
                    <Skeleton
                        width={200}
                        height={30}
                        className="mb-3 skeleton-shimmer"
                    />
                    <Skeleton width={150} height={20} className="skeleton-shimmer" />
                </div>
                <div className="grid grid-cols-3 gap-5 py-5 my-5">
                    <div className="p-4 rounded glassmorphism h-[120px]">
                        <Skeleton
                            width={150}
                            height={20}
                            className="mb-2 skeleton-shimmer"
                        />
                        <Skeleton width={100} height={30} className="skeleton-shimmer" />
                    </div>
                    <div className="p-4 rounded glassmorphism h-[120px]">
                        <Skeleton
                            width={150}
                            height={20}
                            className="mb-2 skeleton-shimmer"
                        />
                        <Skeleton width={100} height={30} className="skeleton-shimmer" />
                    </div>
                    <div className="p-4 rounded glassmorphism h-[120px]">
                        <Skeleton
                            width={150}
                            height={20}
                            className="mb-2 skeleton-shimmer"
                        />
                        <Skeleton width={100} height={30} className="skeleton-shimmer" />
                    </div>
                </div>
                <div className="p-4 rounded h-[400px] overflow-auto glassmorphism">
                    <Skeleton
                        width={200}
                        height={30}
                        className="mb-3 skeleton-shimmer"
                    />
                    {props.subscriptions && props.subscriptions.length === 0 ? (
                        <Skeleton width={200} height={20} className="skeleton-shimmer" />
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton-shimmer" />
                                    </th>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton-shimmer" />
                                    </th>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton-shimmer" />
                                    </th>
                                    <th className="border-b border-white/20 p-2">
                                        <Skeleton width={100} height={20} className="skeleton-shimmer" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.subscriptions && props.subscriptions.map((sub) => (
                                    <tr className="border-b border-white/20" key={sub.id}>
                                        <td className="p-2">
                                            <Skeleton
                                                width={100}
                                                height={20}
                                                className="skeleton-shimmer"
                                            />
                                        </td>
                                        <td className="p-2">
                                            <Skeleton
                                                width={100}
                                                height={20}
                                                className="skeleton-shimmer"
                                            />
                                        </td>
                                        <td className="p-2">
                                            <Skeleton
                                                width={100}
                                                height={20}
                                                className="skeleton-shimmer"
                                            />
                                        </td>
                                        <td className="p-2">
                                            <Skeleton
                                                width={100}
                                                height={20}
                                                className="skeleton-shimmer"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </SkeletonTheme>
    )
}