import Image from 'next/image';
import Script from 'next/script'

const randomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const imageSource = 'bg-' + randomNumber(1, 6);

const MainImage = () => {
  return (
    <div className="main-image--wrapper relative w-screen h-125-px md:h-250-px lg:h-350-px">
      <div aria-hidden="true" className={`relative w-screen h-125-px md:h-250-px lg:h-350-px bg-cover bg-center ${imageSource}`}></div>
    </div>
  );
};

export default MainImage;
