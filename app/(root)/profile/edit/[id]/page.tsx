"use client";

async function Page({ params }: { params: { id: string } }) {
  function handleSubmit(e: any) {
    e.preventDefault();
  }
  return (
    <div>
      <h1>Profile Page</h1>
      <form>
        <input type="text" placeholder="Name" />
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-base-semibold text-light-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Page;
