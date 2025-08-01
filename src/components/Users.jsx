import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { api } from "../api";
import { useGetValues } from "../hooks/useGetValues";

const initialState = {
  fname: "",
  lname: "",
  age: "",
  gender: "",
};

const Users = () => {
  const { data } = useFetch("users");
  const { formData, handleChange, setFormData } = useGetValues(initialState);
  const [editingItem, setEditingItem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.age = Number(formData.age)

    if(editingItem) {
      api.put(`users/${editingItem.id}`, formData);
      setEditingItem(null)
    }
    else {
      api.post("users", newUser);
    }

  };

  const handleDelete = (id) => {
    api.delete(`users/${id}`);
  };

  const handleUpdate = (item) => {
    setEditingItem(item);
    setFormData(item)
  }

  return (
    <>
      <h2 className="text-center text-4xl font-bold items-center justify-center mx-auto">
        User
      </h2>

      <form className="mt-[40px]" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="fname"
          value={formData.fname}
          placeholder="First Name"
          className="border p-2 m-2"
        />
        <input
          type="text"
          onChange={handleChange}
          name="lname"
          value={formData.lname}
          placeholder="Last Name"
          className="border p-2 m-2"
        />
        <input
          type="number"
          onChange={handleChange}
          name="age"
          value={formData.age}
          placeholder="Age"
          className="border p-2 m-2"
        />
        <label htmlFor="gender" className="ml-2">
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 m-2"
          required
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          type="submit"
          className="border bg-green-500 text-white px-4 py-2 m-2"
        >
          {editingItem ? "save" : "submit"}
        </button>
      </form>

      <div className="container mx-auto w-[60%] mt-5 mb-5">
        <table className="w-full max-w-[1000px] mx-auto shadow-[0_22px_70px_4px_rgba(0,0,0,0.56)] rounded-[10px] overflow-hidden border-b-[green]">
          <thead className="bg-[#00a37a] text-white ">
            <tr>
              <th className="p-[15px_10px] text-left text-[16px]">№</th>
              <th className="p-[15px_10px] text-left text-[16px]">
                First name
              </th>
              <th className="p-[15px_10px] text-left text-[16px]">Last Name</th>
              <th className="p-[15px_10px] text-left text-[16px]">Age</th>
              <th className="p-[15px_10px] text-left text-[16px]">Gender</th>
              <th className="p-[15px_10px] text-left text-[16px]">Actions</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-[#F3F3F3] [&>tr:nth-child(even)]:text-[#549a7b] [&>tr:nth-child(even)]:hover:bg-[rgba(129,129,128,0.301)] mt-6">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white text-[#333] text-[15px] hover:bg-[rgba(129,129,128,0.301)]"
              >
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {index + 1}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {item.fname}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {item.lname}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {item.age}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  {item.gender}
                </td>
                <td className="p-[12px_10px] border-b border-[#ddd]">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <button onClick={() => handleUpdate(item)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
