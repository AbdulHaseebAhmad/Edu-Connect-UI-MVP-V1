import { InviteFormFields } from "./Constants";
export default function SchoolInviteForm({onChangeHandle,generateLink}) {

  const inputChangeHandle = (e) => {
    const {name,value} = e.target;
    console.log(name)
    onChangeHandle({name:name,value:value});
  }

  const submitHandle = (e) =>{
    e.preventDefault();
    generateLink(true);
  }
  return (
    <form className="bg-white rounded-xl shadow-md p-8 mb-8" onSubmit={submitHandle}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Invite a New School
        </h2>
        <p className="text-gray-500">
          Add information to create an invitation
        </p>
      </div>

      {InviteFormFields.map((input,index) => {
        return (
          <div className="mb-6" key={index}>
            <label htmlFor={input.label} className="block text-gray-700 font-medium mb-2">
              {input.label}
            </label>
            <input
              type={input.type}
              name={input.name} 
              id={input.label}
              required={input.required}
              placeholder={input.holder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e)=>{inputChangeHandle(e)}}
            />
          </div>
        );
      })}

      <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transform transition">
        Generate Invitation
      </button>
    </form>
  );
}
