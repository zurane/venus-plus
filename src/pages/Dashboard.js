import React from "react";
import { useNavigate } from "react-router";
import UnsubscribePopUp from "../components/UnsubscribePopUp.js";
import { Fragment } from "react";
import { subscriptionsApiEndPoints } from "../services/api.js";
import {
  PiDotsThreeVerticalBold,
  PiGearFine,
  PiSignOut,
  PiBell,
  PiCalendar,
  PiWallet,
} from "react-icons/pi";
import dayjs from "dayjs";
import SkeletonLoader from "../components/SkeletonLoader.js";
import AddSubscriptionButton from "../components/interface/AddSubscription.buttton.js";
import SubscriptionForm from "../components/SubscriptionForm.js";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [showFormModal, setShowFormModal] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState(null);
  const [isUnsubscribing, setIsUnsubscribing] = React.useState(false);
  const [selectedSubscription, setSelectedSubscription] = React.useState(null);
  const [isSubscribing, setSubscribing] = React.useState(false);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    price: "",
    currency: "ZAR",
    subscriptionFrequency: "monthly",
    startDate: today,
    paymentMethod: "",
  }
  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const submitSubscription = async (e) => {
    e.preventDefault();
    setSubscribing(true)
    const venusAuth = JSON.parse(localStorage.getItem("venus_auth"));
    const id = venusAuth?.userId;
    if (!id) {
      console.error("User ID not found in local storage.");
      return; // Exit early if there's no ID
    }
    try {
      const res = await subscriptionsApiEndPoints.create(id, formData);
      console.log("Subscription created:", res);
      setFormData(initialFormData); // reset form input values 
      closeFormModal();
      // Refresh the subscriptions list after creating a new one
      const updatedSubscriptions = await subscriptionsApiEndPoints.getSubData(id);
      setSubscriptions(updatedSubscriptions || []);
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setSubscribing(false)
    }
  };

  const triggerPopUp = (sub) => {
    setSelectedSubscription(sub);
    setIsUnsubscribing(true);
  };

  const closePopUp = () => {
    setIsUnsubscribing(false);
    setSelectedSubscription(null);
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const signOut = () => {
    localStorage.removeItem("venus_auth");
    navigate("/sign-in");
  };

  const triggerFormModal = () => {
    setShowFormModal(!showFormModal);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const deleteSubscription = async (id) => {
    setDeletingId(id)
    const subscriberId = JSON.parse(localStorage.getItem("venus_auth")).userId;
    try {
      const response = await subscriptionsApiEndPoints.delete(id);
      console.log(response);
      const res = await subscriptionsApiEndPoints.getSubData(subscriberId)
      setSubscriptions(res || [])
      setDeletingId(null)
      closePopUp();
    } catch (e) {
      console.error(e)
    }
  }

  const userName = localStorage.getItem("venus_auth")
    ? JSON.parse(localStorage.getItem("venus_auth")).name
    : "Guest";

  React.useEffect(() => {
    setIsLoading(true);
    const id = JSON.parse(localStorage.getItem("venus_auth")).userId;
    const fetchSubscriptions = async () => {
      try {
        const res = await subscriptionsApiEndPoints.getSubData(id);
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

  const data = subscriptions.data || []; // store the actual array of subscriptions for easier access

  return (
    <Fragment>

      <div className="h-screen dashboard-bg">
        {isLoading ? (
          <SkeletonLoader subscriptions={data} />
        ) : (
          <div className="max-w-6xl m-auto px-4 py-8">
            <SubscriptionForm
              showModal={showFormModal}
              cancel={closeFormModal}
              handleChange={handleChange}
              submitSubscription={submitSubscription}
              formData={formData}
              submitting={isSubscribing}
            />
            {isUnsubscribing && selectedSubscription && (
              <UnsubscribePopUp
                cta={
                  deletingId === selectedSubscription._id
                    ? <span>Please wait...</span>
                    : "Yes, I understand"
                }
                removeSub={() => deleteSubscription(selectedSubscription._id)}
                close={closePopUp}
                disableBtn={deletingId === selectedSubscription._id}
              />
            )}
            <div className="flex flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>

                <p className="text-white/80">
                  <strong>Hello</strong>, {userName}
                </p>
              </div>
              <div className="relative">
                <div className="inline-flex gap-3 items-center">
                  <AddSubscriptionButton triggerModal={triggerFormModal} cta={'Add a new subscription'} />
                  <button
                    onClick={togglePopover}
                    className="p-2 rounded-full bg-white"
                  >
                    <PiDotsThreeVerticalBold size={24} />
                  </button>
                </div>

                <div
                  className={`absolute left-0 mt-2 ml-64 top-0 w-48 glassmorphism border rounded shadow-lg  ${isPopoverOpen ? "block" : "hidden"}`}
                >
                  <div
                    onClick={() => (window.location.href = "/settings")}
                    className="  cursor-pointer py-3"
                  >
                    <div className="flex items-center gap-2 px-2">
                      <PiGearFine size={20} className="text-white" />
                      <span className="text-white">Settings</span>
                    </div>
                  </div>
                  <div className="  cursor-pointer py-3 border-t border-[#ffffff33]">
                    <button
                      className="flex items-center gap-2 px-2"
                      onClick={signOut}
                    >
                      <PiSignOut size={20} className="text-white" />
                      <span className="text-white">Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 mt-5">
              <div className="p-4 rounded glassmorphism relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">
                      Your active subscriptions
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {data.length}
                    </p>
                  </div>
                  <PiBell size={32} className="text-purple-500" />
                </div>
              </div>
              <div className="p-4 rounded glassmorphism">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">Your upcoming renewals</p>
                    <p className="text-2xl font-bold text-white">
                      {
                        data.filter(
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
                    <p className="text-white text-sm">Total spending (ZAR)</p>
                    <p className="text-2xl font-bold text-white">
                      R{" "}
                      {data
                        .reduce((sum, sub) => sum + (sub.price || 0), 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <PiWallet size={32} className="text-emerald-500" />
                </div>
              </div>
            </div>
            <div className="p-4 shadow-sm  rounded h-[400px] overflow-auto glassmorphism">
              <h2
                className={`text-xl font-bold mb-3 text-white ${data.length === 0 ? "hidden" : ""}`}
              >
                Your Subscriptions
              </h2>
              {data.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="text-center flex items-center ">
                    <AddSubscriptionButton triggerModal={triggerFormModal} cta={'Add a subscription'} />
                  </div>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b border-white/10 p-2 text-white">
                        Name
                      </th>
                      <th className="border-b border-white/10 p-2 text-white">
                        Price (ZAR)
                      </th>
                      <th className="border-b border-white/10 p-2 text-white">
                        Renewal Date
                      </th>
                      <th className="border-b border-white/10 p-2 text-white">
                        Payment Method
                      </th>
                      <th className="border-b border-white/10 p-2 text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(data) &&
                      data.map((sub) => (
                        <tr className="border-b border-white/10" key={sub._id}>
                          <td className="py-4 px-2 text-white">{sub.name}</td>
                          <td className="p-2 text-white">
                            R {sub.price ? sub.price.toFixed(2) : "N/A"}
                          </td>
                          <td className="p-2 text-white">
                            {sub.renewalDate
                              ? dayjs(sub.renewalDate).format("MMM D, YYYY")
                              : "N/A"}
                          </td>
                          <td className="p-2 text-white">
                            {sub.paymentMethod}
                          </td>
                          <td className="p-2 text-white relative">
                            <button
                              onClick={() => triggerPopUp(sub)}
                              className="px-5 py-1 rounded-sm glassmorphism flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed min-w-[130px]"
                            >
                              Unsubscribe
                            </button>
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

