interface Feat {
  id: number;
  title: string;
  image: string;
  desc: string;
}

const featuresList: Array<Feat> = [
  {
    id: 1,
    title: "Clean Interface",
    image: "./cleaninterface.png",
    desc: "No Clutter, No distractions",
  },
  {
    id: 2,
    title: "Privacy First",
    image: "./privacy.png",
    desc: "Your conversations are yours. End-to-end encryption keeps them safe and private.",
  },
  {
    id: 3,
    title: "Thoughtful Groups",
    image: "./groupchat.png",
    desc: " Group conversations that feel natural, not chaotic. Quality over quantity. ",
  },
];

export default function Features() {
  return (
    <div className="flex gap-14 text-white justify-center mt-44">
      {featuresList.map((feat) => {
        return (
          <div key={feat.id} className="flex flex-col items-center">
            <img className="border-0" src={feat.image} height={50} width={50} />
            <h3 className="mt-4">{feat.title}</h3>
            <p className="text-center mt-1 max-w-80 ">{feat.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
