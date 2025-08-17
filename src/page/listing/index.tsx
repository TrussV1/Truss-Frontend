import { BiEdit, BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { productData } from "./data";
import Empty from "../../assets/svg/undraw_no-data_ig65.svg";

const Listing = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Listings</h1>
        <button
          onClick={() => navigate("/add-listing")}
          className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          <BiPlus size={20} /> Add New
        </button>
      </div>

      {/* Product Table */}
      {productData?.length >= 1 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">Image</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Price (ETH)
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Rating
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product: any, idx: number) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <img
                      src={product?.img}
                      alt={product?.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{product?.title}</td>
                  <td className="px-6 py-4">{product?.priceEth}</td>
                  <td className="px-6 py-4">{product?.rating}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3 items-center">
                    <button
                      onClick={() => alert("Stage 2 feature")}
                      className="text-blue-600 hover:underline"
                    >
                      <BiEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {productData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No products listed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <img className="w-40 h-40" src={Empty} alt="empty" />
          <h1>No listing yet</h1>
        </div>
      )}
    </div>
  );
};

export default Listing;
