import { asset } from "$fresh/runtime.ts";

function Login() {
  return (
    <a href="/account" class="btn btn-square btn-sm btn-ghost no-animation">
      <img
        id="user"
        src={asset("/image/user.webp")}
        alt="User Icon"
        width={24}
        height={24}
      />
    </a>
  );
}

export default Login;
