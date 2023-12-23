const GameCouple = ({
  couple,
  areWinners,
}: {
  couple: string[];
  areWinners: boolean;
}) => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center ${
        areWinners ? "font-bold" : "font-thin"
      }`}
    >
      {couple.length > 0 ? (
        <>
          <span>{couple[0]}</span>
          <span>{couple[1]}</span>
        </>
      ) : (
        <span>--</span>
      )}
    </div>
  );
};
export default GameCouple;
