import { PiPlusLight } from "react-icons/pi"
export default function AddSubscriptionButton(props) {
    return (
        <button className="flex items-center px-3 py-3 glassmorphism text-white  text-xs font-medium rounded-full" onClick={props.triggerModal}>
            <PiPlusLight size={20} className="mr-2 text-white" />
            {props.cta}
        </button>
    )
}
