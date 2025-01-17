import Avatar from "@/components/Avatar";
import BackgroundBlur from "@/components/BackgroundBlur";

const Home = () => {
  return (
    <BackgroundBlur>
      <div className="container pt-20 flex flex-col gap-20 pb-20">
        <Avatar />
      </div>
    </BackgroundBlur>
  );
};

export default Home;
