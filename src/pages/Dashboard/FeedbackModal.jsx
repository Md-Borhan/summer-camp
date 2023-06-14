import { useState } from "react";
import { toast } from "react-hot-toast";
const FeedbackModal = ({ data }) => {
  const [feedbackData, setFeedbackData] = useState("");

  const handleFeedback = (sc) => {
    console.log(feedbackData);
    fetch(`${import.meta.env.VITE_api_url}/classes/feedback/${sc._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback: feedbackData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          // refetch();
          toast.success("Send Feedback");
        }
      });
  };
  return (
    <dialog
      id="my_modal_3"
      className="modal bg-[#322a71] h-full w-full  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
    >
      <form method="dialog" className="modal-box border bg-[#322a71]">
        <button
          htmlFor="my-modal-3"
          title="Press ESC key to close modal"
          className="btn btn-sm text-white btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-3 text-white">Send Feedback!</h3>
        <div className="form-control bg-[#322a71]">
          <textarea
            onChange={(e) => setFeedbackData(e.target.value)}
            className="textarea bg-[#322a71] text-white textarea-bordered textarea-info h-32"
            // name="feedback"
            placeholder="Write Your Feedback"
          ></textarea>
        </div>
        <div className="form-control mt-6 border p-1 rounded-full inline-block border-[#571ce0] shadow-blue-100 shadow w-full">
          <button
            onClick={() => handleFeedback(data)}
            type="submit"
            className="btn btn-block rounded-full border-transparent bg-[#571ce0] hover:bg-transparent px-5 text-white hover:border-[#571ce0]"
          >
            Send Feedback
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default FeedbackModal;
