import React from "react";

export default function UnsubscribePopUp(props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm "></div>

      {/* Modal */}
      <div className="relative max-w-sm w-full mx-4 bg-white rounded-lg shadow-lg p-6 text-center">

        <h3 className="text-lg font-semibold text-slate-900">
          Continue to unsubscribe?
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          This will permanently remove your service. This action cannot be undone.
        </p>

        <div className="flex gap-2 mt-6">
          <button onClick={props.close} className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={props.disableBtn}>
            Cancel
          </button>

          <button onClick={props.removeSub} className="flex-1 items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={props.disableBtn}>
            {props.cta}
          </button>
        </div>

      </div>
    </div>
  );
}
