import SectionTitle from "../../components/SectionTitle";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AddClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const onSubmit = (data) => {
    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_url
    }`;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageUploadURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        console.log(data);
        const { className, name, email, seats, price } = data;
        const classDetails = {
          className,
          imageUrl,
          name,
          email,
          seats: parseFloat(seats),
          price: parseFloat(price),
          status: "pending",
          feedback: "empty",
          enrolled: parseFloat(0),
          availableSeats: parseFloat(seats - 1),
        };
        fetch(`${import.meta.env.VITE_api_url}/classes`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(classDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              Swal.fire({
                title: `Class Added!`,
                showConfirmButton: false,
                timer: 1000,
                icon: "success",
              });
              reset();
            }
          });
        console.log(classDetails);
      });
  };
  console.log(errors);
  return (
    <div className="">
      <SectionTitle title="Add a Class" />
      <div className="bg-[#322a71] p-10 rounded-md">
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Class Name</span>
              </label>
              <input
                type="text"
                name="className"
                {...register("className")}
                placeholder="Class Name"
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
                {...register("image", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Instructor Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="Instructor Name"
                  className="input w-full shadow-blue-200 shadow input-bordered"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Instructor Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  {...register("email", {
                    required: true,
                  })}
                  placeholder="Instructor Email"
                  className="input w-full shadow-blue-200 shadow input-bordered"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Available Seats</span>
              </label>
              <input
                type="number"
                name="seats"
                {...register("seats", {
                  required: true,
                })}
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
                {...register("price")}
                placeholder="$ Price"
                className="input shadow-blue-200 shadow input-bordered"
              />
            </div>
          </div>
          <div className="w-full  md:w-1/3 lg:w-2/6 mx-auto form-control border p-1 rounded-full border-[#571ce0] shadow-blue-100 shadow">
            <input
              className="btn rounded-full border-transparent bg-[#571ce0] hover:bg-transparent text-white hover:border-[#571ce0]"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
