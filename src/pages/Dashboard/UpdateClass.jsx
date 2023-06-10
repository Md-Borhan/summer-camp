import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const UpdateClass = ({ modalData }) => {
  const { user } = useAuth();
  const handleSubmit = (event) => {
    const form = event.target;
    const className = form.className.value;
    const image = form.image.files;
    const name = form.name.value;
    const email = form.email.value;
    const seats = form.seats.value;
    const price = form.price.value;
    // const classDetails = { className, image, name, email, seats, price };
    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_url
    }`;
    const formData = new FormData();
    formData.append("image", image[0]);
    fetch(imageUploadURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        const classDetails = {
          className,
          imageUrl,
          name,
          email,
          seats: parseFloat(seats),
          price: parseFloat(price),
        };
        console.log(classDetails);
        fetch(`${import.meta.env.VITE_api_url}/classes/${modalData._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(classDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: `${modalData.className} Class is Updated!`,
                showConfirmButton: false,
                timer: 1500,
                icon: "success",
              });
            }
            form.reset();
          });
      });
  };
  return (
    <div>
      <dialog
        id="my_modal_4"
        className="modal bg-[#322a71] h-full w-full  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
      >
        <form
          method="dialog"
          onSubmit={handleSubmit}
          className="modal-box bg-[#322a71] border border-gray-100 w-11/12 max-w-5xl"
        >
          <h3 className="font-bold text-2xl text-white md:text-3xl lg:text-5xl text-center">
            Update Class!
          </h3>
          <div className=" p-10 rounded-md">
            <div className="space-y-2">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Class Name</span>
                  </label>
                  <input
                    type="text"
                    name="className"
                    placeholder="Class Name"
                    defaultValue={modalData.className}
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-white">Class Image</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="file-input  shadow-blue-200 shadow file-input-bordered w-full "
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      Instructor Name
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.displayName}
                      placeholder="Instructor Name"
                      className="input w-full shadow-blue-200 shadow input-bordered"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      Instructor Email
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email}
                      placeholder="Instructor Email"
                      className="input w-full shadow-blue-200 shadow input-bordered"
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 pb-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      Available Seats
                    </span>
                  </label>
                  <input
                    type="number"
                    name="seats"
                    defaultValue={modalData.seats}
                    placeholder="Available Seats"
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="$ Price"
                    defaultValue={modalData.price}
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
              </div>
              <div className="w-full  md:w-1/3 lg:w-2/6 mx-auto form-control border p-1 rounded-full border-[#571ce0] shadow-blue-100 shadow">
                <button
                  className="btn rounded-full border-transparent bg-[#571ce0] hover:bg-transparent text-white hover:border-[#571ce0]"
                  type="submit"
                >
                  Update Class
                </button>
              </div>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UpdateClass;
