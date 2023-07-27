type Props = {
  handleOnClick?: () => Promise<void> | void;
  customLayout?: string;
};

const Save = ({ handleOnClick, customLayout }: Props) => {
  return (
    <button
      className={` ${
        customLayout && customLayout
      } p-2 bg-[#EB455F] text-white text-[13px] rounded-md active:translate-y-[2px] drop-shadow-lg`}
      onClick={handleOnClick && handleOnClick}
    >
      Save
    </button>
  );
};

export default Save;
