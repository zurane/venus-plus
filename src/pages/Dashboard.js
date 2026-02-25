import React from 'react';
import { Fragment } from 'react';
import { subscriptionsAPI } from '../services/api.js'
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import dayjs from 'dayjs';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Dashboard() {

    const [subscriptions, setSubscriptions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const userName = localStorage.getItem('venus_auth') ? JSON.parse(localStorage.getItem('venus_auth')).name : 'Guest';

    React.useEffect(() => {
        setIsLoading(true);
        const fetchSubscriptions = async () => {
            try {
                const res = await subscriptionsAPI.getAll();
                // API returns { data: [...] }
                console.table(res);
                setSubscriptions(res || []);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
            }
        };
        fetchSubscriptions();
    }, []);



    return (
        <Fragment>
            <div className='h-screen bg-gray-100'>
                {isLoading ? (<SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0" duration={1.5} direction="ltr" enableAnimation={true}>

                    <div className='max-w-6xl m-auto px-4 py-8'>
                        <div>
                            <Skeleton width={200} height={30} className='mb-3' />
                            <Skeleton width={150} height={20} />
                        </div>
                        <div className='grid grid-cols-3 gap-5 py-5 my-5'>
                            <div className='p-4 border shadow-sm rounded'>
                                <Skeleton width={150} height={20} className='mb-2' />
                                <Skeleton width={100} height={30} />
                            </div>
                            <div className='p-4 border shadow-sm rounded'>
                                <Skeleton width={150} height={20} className='mb-2' />
                                <Skeleton width={100} height={30} />
                            </div>
                            <div className='p-4 border shadow-sm rounded'>
                                <Skeleton width={150} height={20} className='mb-2' />
                                <Skeleton width={100} height={30} />
                            </div>
                        </div>
                        <div className='p-4 shadow-sm rounded'>
                            <Skeleton width={200} height={30} className='mb-3' />
                            {subscriptions.length === 0 ? (
                                <Skeleton width={200} height={20} />
                            ) : (
                                <table className='w-full text-left border-collapse'>
                                    <thead>
                                        <tr>
                                            <th className='border-b p-2'><Skeleton width={100} height={20} /></th>
                                            <th className='border-b p-2'><Skeleton width={100} height={20} /></th>
                                            <th className='border-b p-2'><Skeleton width={100} height={20} /></th>
                                            <th className='border-b p-2'><Skeleton width={100} height={20} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriptions.map(sub => (
                                            <tr className='border-b ' >
                                                <td className='p-2'><Skeleton width={100} height={20} /></td>
                                                <td className='p-2'><Skeleton width={100} height={20} /></td>
                                                <td className='p-2'><Skeleton width={100} height={20} /></td>
                                                <td className='p-2'><Skeleton width={100} height={20} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                </SkeletonTheme>
                ) :
                    <div className='max-w-6xl m-auto px-4 py-8'>
                        <div className='flex flex-row items-center justify-between'>
                            <div>
                                <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
                            <p className='text-gray-900'><strong>Hello</strong>, {userName}</p>
                                </div>
                            <button onClick={() => window.location.href = '/settings'} className='p-2 rounded-full bg-gray-200'>
                                <PiDotsThreeVerticalBold size={24} />
                            </button>
                        </div>
                        <div className='grid grid-cols-3 gap-5 py-5 my-5'>
                            <div className='p-4 border shadow-sm rounded'>
                                <p>Your active Subscriptions</p>
                                <p className='text-2xl font-bold'>{subscriptions.length}</p>
                            </div>
                            <div className='p-4 border shadow-sm rounded'>
                                <p>Your upcoming renewals</p>
                                <p className='text-2xl font-bold'>{subscriptions.filter(sub => sub.renewalDate && dayjs(sub.renewalDate).isAfter(dayjs())).length}</p>
                            </div>
                            <div className='p-4 border shadow-sm rounded'>
                                <p>Total spending (ZAR)</p>
                                <p className='text-2xl font-bold'>R {subscriptions.reduce((sum, sub) => sum + (sub.price || 0), 0).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='p-4 shadow-sm border rounded'>
                            <h2 className='text-xl font-bold mb-3'>Your Subscriptions</h2>
                            {subscriptions.length === 0 ? (
                                <p className='text-gray-600'>You have no subscriptions yet.</p>
                            ) : (
                                <table className='w-full text-left border-collapse'>
                                    <thead>
                                        <tr>
                                            <th className='border-b p-2'>Name</th>
                                            <th className='border-b p-2'>Price (ZAR)</th>
                                            <th className='border-b p-2'>Renewal Date</th>
                                            <th className='border-b p-2'>Payment Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriptions.map(sub => (
                                            <tr className='border-b ' key={sub.id}>
                                                <td className='p-2'>{sub.name}</td>
                                                <td className='p-2'>R {sub.price ? sub.price.toFixed(2) : 'N/A'}</td>
                                                <td className='p-2'>{sub.renewalDate ? dayjs(sub.renewalDate).format('MMM D, YYYY') : 'N/A'}</td>
                                                <td className='p-2'>{sub.paymentMethod}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>}
            </div>
        </Fragment>
    )
}
