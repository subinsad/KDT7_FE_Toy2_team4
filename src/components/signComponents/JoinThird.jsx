import Heading from "../../components/Heading";
import Input from "../../components/Input";
import { FormText, Grid, GridColumnSpan } from "../../components/GlobalStyles";
import Avatar from "../../components/Avatar";
import mypageHeader from "../../assets/bg_profile.png";
import styled from "styled-components";
import { Button } from "../../components/GlobalStyles";
import { useState } from "react";
import { useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editUserBg, editUserImg, fetchUserInfo } from "../../store/user.slice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../Loading";
import { clearUserInfo } from "../../store/signInfo.slice";

const SignHeader = styled.div``;
const SampleMypage = styled.div`
  position: relative;
  .skeleton {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr min-content;
    gap: 0.5rem 1rem;
    padding: 0.5rem;
    margin-top: -2rem;
    > div {
      background-color: var(--secondary);
      opacity: 0.2;
    }
    &__name {
      width: 5rem;
      height: 1rem;
      align-self: end;
    }
    &__info {
      width: 10rem;
      height: 0.5rem;
    }
  }
  button {
    grid-row: span 2;
    border-radius: 0.375rem;
    width: 5rem;
    height: 5rem;
    pointer-events: none;
    cursor: auto;
  }
  img {
    width: 100%;
  }
`;

const JoinThird = ({ setActiveStep }) => {
    const dispatch = useDispatch()
    const { name, email, password } = useSelector((state) => state.signInfoSlice.signInfo)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        userImg: "",
        userBg: "",
    })

    const [errorMessage, setErrorMessage] = useState({
        userImg: "",
        userBg: "",
    })

    const checkForm = () => {
        let isValid = true;
        if (!formData.userImg) {
            setErrorMessage((prevData) => ({
                ...prevData,
                userImg: "유저 이미지를 등록해주세요."
            }));
            isValid = false;
        }
        if (!formData.userBg) {
            setErrorMessage((prevData) => ({
                ...prevData,
                userBg: "배경화면을 등록해주세요."
            }));
            isValid = false;
        }
        return isValid;
    }


    const handleFileChange = (field) => (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFormData((prevData) => ({
                ...prevData,
                [field]: files[0],
            }));
        }
    }

    const handlePrev = () => {
        setActiveStep((prev) => prev - 1)
    }

    const handleSubmit = async () => {
        const isValidForm = checkForm();
        if (isValidForm) {
            try {
                setLoading(true)
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                dispatch(fetchUserInfo(user))
                if (formData.userImg) {
                    const userDocRef = doc(db, "users", user.uid, "userInfo", "data")
                    const locationRef = ref(storage, `UserImage/${name}`);
                    const result = await uploadBytes(locationRef, formData.userImg);
                    const userImgUrl = await getDownloadURL(result.ref);
                    await setDoc(
                        userDocRef,
                        {
                            userImg: userImgUrl,
                        },
                        { merge: true }
                    );
                    dispatch(editUserImg(userImgUrl));
                }
                if (formData.userBg) {
                    const userDocRef = doc(db, "users", user.uid, "userInfo", "data")
                    const locationRef = ref(storage, `UserBg/${name}`);
                    const result = await uploadBytes(locationRef, formData.userBg);
                    const userBgUrl = await getDownloadURL(result.ref);
                    await setDoc(
                        userDocRef,
                        {
                            userBg: userBgUrl,
                        },
                        { merge: true }
                    );
                    dispatch(editUserBg(userBgUrl));
                    const userEmailRef = ref(storage, `UserEmail/${email}`);
                    await uploadBytes(userEmailRef, new Uint8Array(0));
                }

            } catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false)
                dispatch(clearUserInfo())
            }
            setActiveStep((prev) => prev + 1)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage((prevMessages) => ({
                ...prevMessages,
                userImg: "",
                userBg: "",
            }));
        }, 3000);

        return () => clearTimeout(timer);
    }, [errorMessage]);



    return (
        <>
            {loading && (<Loading />)}
            <SignHeader>
                <Heading size={"sm"} tag={"h2"}>
                    사진 업로드
                </Heading>
                <p className="mb3">본인 인증을 위한 사진을 업로드하세요.</p>
            </SignHeader>
            <Grid $col="2" className="mb3">
                <GridColumnSpan $span="2">
                    <SampleMypage>
                        <img src={mypageHeader} alt="" />
                        <div className="skeleton">
                            <Avatar $size="md" />
                            <div className="skeleton__name"></div>
                            <div className="skeleton__info"></div>
                        </div>
                    </SampleMypage>
                </GridColumnSpan>
                <div>
                    <Input id="userImg" type="file" label="file1" labelText="Profile Image" onChange={handleFileChange("userImg")} />
                    {errorMessage.userImg && (<FormText $error>{errorMessage.userImg}</FormText>)}
                </div>
                <div>
                    <Input id="userBg" type="file" label="file2" labelText="Mypage Background Image" onChange={handleFileChange("userBg")} />
                    {errorMessage.userBg && (<FormText $error>{errorMessage.userBg}</FormText>)}
                </div>
            </Grid>
            <div className="align both">
                <Button $color="secondary" onClick={handlePrev} >
                    이전
                </Button>
                <Button $color="primary" onClick={handleSubmit}>
                    완료
                </Button>
            </div>
        </>
    )
}

export default JoinThird
