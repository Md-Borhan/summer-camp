import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payment = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });
  console.log(payment);
  return (
    <div className="text-white">
      <SectionTitle title="My Enrolled Class" />
      <div className="overflow-x-auto bg-[#322a71] p-10 rounded-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white border-[#571ce0]">
              <th>S/L</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Transaction Id</th>
              <th>Enrolled Date</th>
              <th>Payment Type</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {payment?.map((sp, index) => (
              <tr key={sp._id} className="border-b border-[#571ce0]">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="rounded-full  border-[#571ce057] shadow-blue-100 shadow border w-12 h-12">
                        <img src={sp.classImage} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{sp.className}</td>
                <td>{sp.transactionId}</td>
                <td>{sp.date.slice(0, 10)}</td>
                <td>Card</td>
                <td className="text-right">$ {sp.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
