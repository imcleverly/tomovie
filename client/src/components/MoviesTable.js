import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (movie, index, role, onDeleteHandler, downloadVideo, progress) => {
  return (
    <tr key={index}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            src={movie?.image || "/assets/images/logo.png"}
            alt={movie?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie?.name}</td>
      <td className={`${Text}`}>{movie?.category?.title}</td>
      <td className={`${Text}`}>{movie?.language}</td>
      <td className={`${Text}`}>{movie?.year}</td>
      <td className={`${Text}`}>{movie?.time}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {role === "Admin" ? (
          <>
            <Link
              to={`/admin/movies/${movie?._id}`}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
            >
              Edit <FaEdit className="text-green-500" />
            </Link>
            <button
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
              onClick={() => onDeleteHandler(movie?._id)}
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
              onClick={() => downloadVideo(movie?.video, movie?.name)}
            >
              Download <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/movies/${movie?._id}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

const MoviesTable = ({
  data,
  role,
  onDeleteHandler,
  downloadVideo,
  progress,
}) => {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, index) =>
            Rows(movie, index, role, onDeleteHandler, downloadVideo, progress)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesTable;
