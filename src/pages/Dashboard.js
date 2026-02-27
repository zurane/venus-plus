import React from "react";
import { Fragment } from "react";
import { subscriptionsAPI } from "../services/api.js";
import { PiDotsThreeVerticalBold, PiGearFine, PiSignOut, PiBell, PiCalendar, PiWallet,PiCaretDownThin } from "react-icons/pi";
import dayjs from "dayjs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const signOut = () => {
    localStorage.removeItem("venus_auth");
    window.location.href = "/sign-in";
  }


  const userName = localStorage.getItem("venus_auth")
    ? JSON.parse(localStorage.getItem("venus_auth")).name
    : "Guest";

  React.useEffect(() => {
    setIsLoading(true);
    const fetchSubscriptions = async () => {
      try {
        const res = await subscriptionsAPI.getAll();
        // API returns { data: [...] }
        console.table(res);
        setSubscriptions(res || []);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <Fragment>
      <div className="h-screen dashboard-bg">
        {isLoading ? (
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
                {subscriptions.length === 0 ? (
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
                      {subscriptions.map((sub) => (
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
        ) : (
          <div className="max-w-6xl m-auto px-4 py-8">
            <div className="flex flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-white/80">
                  <strong>Hello</strong>, {userName}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={togglePopover}
                  className="p-2 rounded-full bg-gray-200"
                >
                  <PiDotsThreeVerticalBold size={24} />
                </button>

                <div
                  className={`absolute left-12 mt-2 ml-1 top-0 w-48 bg-white border rounded shadow-lg p-2 ${isPopoverOpen ? "block" : "hidden"}`}
                >
                  <div
                    onClick={() => (window.location.href = "/settings")}
                    className=" hover:bg-gray-100 cursor-pointer py-3"
                  >
                    <div className="flex items-center gap-2 px-2">
                        <PiGearFine size={20} className="text-gray-700"  />
                        <span className="text-gray-700">Settings</span>
                    </div>
                  </div>
                  <div
                    
                    className=" hover:bg-gray-100 cursor-pointer py-3 border-t"
                  >
                    <button className='flex items-center gap-2 px-2' onClick={signOut}>
                      <PiSignOut size={20} className="text-gray-700" />
                    <span className="text-gray-700">Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 mt-5">
              <div className="p-4 rounded glassmorphism ">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Your active subscriptions</p>
                    <p className="text-2xl font-bold text-white">
                      {subscriptions.length}
                    </p>
                  </div>
                  <PiBell size={32} className="text-purple-500" />
                </div>
              </div>
              <div className="p-4 rounded glassmorphism">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Your upcoming renewals</p>
                    <p className="text-2xl font-bold text-white">
                      {
                        subscriptions.filter(
                          (sub) =>
                            sub.renewalDate &&
                            dayjs(sub.renewalDate).isAfter(dayjs()),
                        ).length
                      }
                    </p>
                  </div>
                  <PiCalendar size={32} className="text-rose-500" />
                </div>
              </div>
              <div className="p-4 rounded glassmorphism">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Total spending (ZAR)</p>
                    <p className="text-2xl font-bold text-white">
                      R{" "}
                      {subscriptions
                        .reduce((sum, sub) => sum + (sub.price || 0), 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <PiWallet size={32} className="text-emerald-500" />
                </div>
              </div>
            </div>
            <div className="p-4 shadow-sm  rounded h-[400px] overflow-auto glassmorphism">
              <h2 className="text-xl font-bold mb-3 text-white">
                Your Subscriptions
              </h2>
              {subscriptions.length === 0 ? (
                <p className="text-white/80">You have no subscriptions yet.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b border-white/10 p-2 text-white">Name</th>
                      <th className="border-b border-white/10 p-2 text-white">Price (ZAR)</th>
                      <th className="border-b border-white/10 p-2 text-white">Renewal Date</th>
                      <th className="border-b border-white/10 p-2 text-white">
                        Payment Method
                      </th>
                      <th className="border-b border-white/10 p-2 text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr className="border-b border-white/10" key={sub.id}>
                        <td className="py-4 px-2 text-white">{sub.name}</td>
                        <td className="p-2 text-white">
                          R {sub.price ? sub.price.toFixed(2) : "N/A"}
                        </td>
                        <td className="p-2 text-white">
                          {sub.renewalDate
                            ? dayjs(sub.renewalDate).format("MMM D, YYYY")
                            : "N/A"}
                        </td>
                        <td className="p-2 text-white">{sub.paymentMethod}</td>
                        <td className="p-2 text-white">
                          <div className="relative inline-block w-[100px]">
                            <select className="bg-gray-800 border border-white/10 text-white text-sm px-2 py-1 rounded cursor-pointer w-full appearance-none pr-8">
                              <option value="">Manage</option>
                              <option value="pause">Pause</option>
                              <option value="cancel">Cancel</option>
                            </select>
                            <PiCaretDownThin className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={16} />
                          </div>
                        </td>
                      </tr>
                      
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
