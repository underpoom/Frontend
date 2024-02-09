import * as React from "react";

function MyComponentTW(props) {
  return (
    <div className="px-8 py-5 bg-neutral-100 max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-9 pt-12 pb-5 mx-auto w-full text-3xl font-bold text-white rounded-3xl bg-zinc-800 max-md:px-5 max-md:mt-10">
            <div className="mt-3 text-4xl">Management</div>
            <div className="shrink-0 mt-11 h-0.5 bg-white max-md:mt-10" />
            <div className="flex gap-5 justify-between mt-14 mr-2.5 w-full whitespace-nowrap max-md:mt-10">
              <div className="flex gap-5 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a8d2208cdd599c9d6f523e568748f8f802922a12dfd70c75e1296f855540b8e?apiKey=34584a6259e046a0be0d44044e057cb8&"
                  className="aspect-square fill-neutral-50 w-[33px]"
                />
                <div className="my-auto">User</div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/68ba5ea429ea0d68ab27d916dc8ad5ea87a39376ecb128162ac61552e2615687?apiKey=34584a6259e046a0be0d44044e057cb8&"
                className="my-auto aspect-[0.56] fill-white w-[13px]"
              />
            </div>
            <div className="flex gap-5 justify-between mt-24 mr-2.5 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e5ad0d00ab460ea192b2777c8b4f4210a018fad5ab76df4a8acc1b6e3d1d12a?apiKey=34584a6259e046a0be0d44044e057cb8&"
                className="self-start aspect-square fill-neutral-50 w-[26px]"
              />
              <div className="flex-auto">Add Factory</div>
            </div>
            <div className="flex gap-4 justify-between mt-20 mr-2.5 whitespace-nowrap max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/92b58fe32e3fff2bb6b296857a57e4527a754590de275b0c951b25be680ebc25?apiKey=34584a6259e046a0be0d44044e057cb8&"
                className="aspect-square w-[35px]"
              />
              <div className="flex-auto">Permission</div>
            </div>
            <div className="flex gap-3.5 self-end mt-96 mr-2.5 whitespace-nowrap max-md:mt-10">
              <div className="flex-auto">Logout</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18a69ef420c65facab96b2f931e2dad1d16d1c4e0280a6f46d15388f30a80e7e?apiKey=34584a6259e046a0be0d44044e057cb8&"
                className="w-10 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
            <div className="text-3xl font-bold text-black max-md:max-w-full">
              Manage User
            </div>
            <div className="shrink-0 mt-9 h-px bg-gray-900 max-md:max-w-full" />
            <div className="flex gap-5 justify-between mt-5 ml-20 max-w-full text-2xl font-bold text-black w-[659px] max-md:flex-wrap">
              <div className="flex-auto">Username</div>
              <div>Role</div>
              <div className="flex-auto">Verified File</div>
            </div>
            <div className="py-10 pr-9 pl-20 mt-6 rounded-xl bg-zinc-300 max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
                  <div className="mt-8 text-2xl text-black whitespace-nowrap max-md:mt-10">
                    User no.1
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
                  <div className="flex grow gap-5 justify-between items-center text-2xl text-black whitespace-nowrap max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                    <div className="self-stretch my-auto">User</div>
                    <div className="justify-center self-stretch px-2.5 py-5 rounded-xl border border-solid bg-neutral-50 border-[color:var(--stork,#9F9F9F)]">
                      Download
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&"
                      className="self-stretch my-auto aspect-square w-[50px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between py-10 pr-9 pl-20 mt-5 text-2xl text-black whitespace-nowrap rounded-xl bg-zinc-300 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="text-center">
                จักรรินกลิ่นสี
                <br />
                มานีมีขวด
              </div>
              <div className="self-end mt-8">User</div>
              <div className="justify-center px-2.5 py-5 rounded-xl border border-solid bg-neutral-50 border-[color:var(--stork,#9F9F9F)]">
                Download
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&"
                className="my-auto aspect-square w-[50px]"
              />
            </div>
            <div className="flex gap-5 justify-between py-8 pr-9 pl-20 mt-5 w-full text-2xl text-black rounded-xl bg-zinc-300 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="text-center">Admin Manage user</div>
              <div className="flex gap-5 justify-between my-auto whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="self-end mt-7">Admin</div>
                <div className="justify-center px-2.5 py-5 rounded-xl border border-solid bg-neutral-50 border-[color:var(--stork,#9F9F9F)]">
                  Download
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&"
                  className="my-auto aspect-square w-[50px]"
                />
              </div>
            </div>
            <div className="flex gap-5 justify-between py-8 pr-9 pl-20 mt-6 text-2xl text-black rounded-xl bg-zinc-300 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="text-center">
                Admin
                <br />
                Control Permission
              </div>
              <div className="self-end mt-11 max-md:mt-10">Admin</div>
              <div className="grow justify-center px-3 py-5 my-auto whitespace-nowrap rounded-xl border border-solid bg-neutral-50 border-[color:var(--stork,#9F9F9F)]">
                Download
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&"
                className="my-auto aspect-square w-[50px]"
              />
            </div>
            <div className="flex gap-5 justify-between py-10 pr-9 pl-20 mt-5 text-2xl text-black rounded-xl bg-zinc-300 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="text-center">ThaiBev Employee</div>
              <div className="self-end mt-8">User</div>
              <div className="justify-center px-2.5 py-5 whitespace-nowrap rounded-xl border border-solid bg-neutral-50 border-[color:var(--stork,#9F9F9F)]">
                Download
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18eef55ac0ff935d3d1cc639329aaf0d3ea795f9696368faf6799ced72cdfa6b?apiKey=34584a6259e046a0be0d44044e057cb8&"
                className="my-auto aspect-square w-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponentTW;