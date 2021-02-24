import "./SignIn.css";
import {
  SignInOuterContainer,
  SignInInnerContainer,
  Heading,
  SignInButton,
  TextContainer,
  SignInInput
} from "./styles";

const SignIn = () => {
  return (
    <SignInOuterContainer>
      <SignInInnerContainer>
        <Heading>Book Lists</Heading>
        <div>
          <SignInInput
            placeholder="Name"
            type="text"
          />
        </div>
        <div>
          <SignInInput
            placeholder="Password"
            type="text"
          />
        </div>
          <SignInButton type="submit">
            Sign In
          </SignInButton>
        <TextContainer>
          <h2>Find More, Read More, and Track them!</h2>
          <h5>freeCodeCamp - Salt Lake City</h5>
        </TextContainer>
      </SignInInnerContainer>
    </SignInOuterContainer>
  );
};

export default SignIn;
