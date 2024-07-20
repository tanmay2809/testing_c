const FeedbackButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  return (
    <div className="flex items-center gap-4 rounded-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Button type
        </label>
        <input
          type="text"
          value="Feedback Link"
          readOnly
          className="mt-1 block w-full rounded-md p-2 sm:text-sm bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Button text
        </label>
        <input
          type="text"
          value="Feedback"
          className="mt-1 block w-full rounded-md p-2 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Link</label>
        <input
          type="text"
          value="feedback.com"
          readOnly
          className="mt-1 block w-full rounded-md p-2 sm:text-sm"
        />
      </div>
      <button
        onClick={onDelete}
        className="mt-6 py-2 px-4 rounded-md text-[#E61856] bg-[#FDF1F1] font-medium"
      >
        Delete
      </button>
    </div>
  );
};

export default FeedbackButton;
