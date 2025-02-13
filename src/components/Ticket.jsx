export default function Ticket({ data }) {
    return (
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold">{data.fullName}</h2>
        <p className="text-gray-600">{data.email}</p>
        <img src={data.avatar} alt="Avatar" className="w-24 h-24 mx-auto rounded-full mt-3" />
      </div>
    );
  }
  