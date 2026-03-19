import React from "react";

export default function SubscriptionForm(props) {

  return (
    <div
      className={`fixed inset-0 z-50 ${props.showModal ? 'flex' : 'hidden'} items-center justify-center bg-black/40 backdrop-blur-sm p-5`}
    >
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-md border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-200 px-6 py-5">
          <h1 className="text-2xl font-semibold text-slate-900">
            Add Subscription
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Capture the key subscription details below.
          </p>
        </div>

        <form className="space-y-6 px-6 py-6" onSubmit={props.submitSubscription}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Add a service
              </label>
              <input
                type="text"
                name="name"
                value={props.formData.name}
                onChange={props.handleChange}
                placeholder="e.g. Netflix"
                minLength={2}
                maxLength={100}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              <p className="mt-1 text-xs text-slate-500">
                Enter a name between 2 and 100 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                value={props.formData.price}
                onChange={props.handleChange}
                placeholder="e.g. 199.99"
                min="0"
                step="0.01"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="currency"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Currency
              </label>
              <select
                name="currency"
                value={props.formData.currency}
                onChange={props.handleChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>

              </select>
            </div>

            <div>
              <label
                htmlFor="subscriptionFrequency"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Frequency
              </label>
              <select
                name="subscriptionFrequency"
                value={props.formData.subscriptionFrequency.toLowerCase()}
                onChange={props.handleChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="paymentMethod"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Payment Method
              </label>
              <input
                type="text"
                name="paymentMethod"
                value={props.formData.paymentMethod}
                onChange={props.handleChange}
                placeholder="e.g. Credit Card"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              onClick={props.cancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled={props.submitting}
            >
              {props.submitting ? 'Working...' : 'Subscribe'}
            </button>
          </div>
        </form>
      </div>
    </div>


  );


}