import SuggestedUser from "./SuggestedUser";

export default function RightSidebar() {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-col  ">
        <SuggestedUser />
      </div>
      {/* <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
      </div> */}
    </section>
  );
}
