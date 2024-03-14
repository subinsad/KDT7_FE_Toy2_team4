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
import { fetchUserInfo } from "../../store/user.slice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Loading from "../Loading";
import { addUserBg, addUserImg, clearUserInfo } from "../../store/signInfo.slice";
import { fetchProject } from "../../store/project.slice";

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
  const dispatch = useDispatch();
  const { name, email, password, team, position, phone, shortInfo, image, backgroundImage } = useSelector((state) => state.signInfoSlice.signInfo);
  const [loading, setLoading] = useState(false);

  const [userImg, setUserImg] = useState(image);
  const [userBg, setUserBg] = useState(backgroundImage);

  const [errorMessage, setErrorMessage] = useState({
    userImg: "",
    userBg: "",
  });

  const checkForm = () => {
    let isValid = true;
    if (!userImg) {
      setErrorMessage((prevData) => ({
        ...prevData,
        userImg: "유저 이미지를 등록해주세요.",
      }));
      isValid = false;
    }
<<<<<<< HEAD

    const handleUserImg = async (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            const file = files[0];
            try {
                setLoading(true)
                const imgLocationRef = ref(storage, `UserImage/${name}`);
                const imgResult = await uploadBytes(imgLocationRef, file);
                const userImgUrl = await getDownloadURL(imgResult.ref);
                setUserImg(userImgUrl)
                dispatch(addUserImg(userImgUrl))
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
    }

    const handleUserBg = async (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            const file = files[0];
            try {
                setLoading(true)
                const imgLocationRef = ref(storage, `UserBg/${name}`);
                const imgResult = await uploadBytes(imgLocationRef, file);
                const userImgUrl = await getDownloadURL(imgResult.ref);
                setUserBg(userImgUrl)
                dispatch(addUserBg(userImgUrl))
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false)

            }
        }
=======
    if (!userBg) {
      setErrorMessage((prevData) => ({
        ...prevData,
        userBg: "배경화면을 등록해주세요.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleUserImg = async (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      try {
        setLoading(true);
        const imgLocationRef = ref(storage, `UserImage/${name}`);
        const imgResult = await uploadBytes(imgLocationRef, file);
        const userImgUrl = await getDownloadURL(imgResult.ref);
        setUserImg(userImgUrl);
        dispatch(addUserImg(userImgUrl));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
>>>>>>> feature/work
    }
  };

  const handleUserBg = async (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      try {
        setLoading(true);
        const imgLocationRef = ref(storage, `UserBg/${name}`);
        const imgResult = await uploadBytes(imgLocationRef, file);
        const userImgUrl = await getDownloadURL(imgResult.ref);
        setUserBg(userImgUrl);
        dispatch(addUserBg(userImgUrl));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
<<<<<<< HEAD

    const handleSubmit = async () => {
        const isValidForm = checkForm();
        if (isValidForm) {
            try {
                setLoading(true)
                const { user } = await createUserWithEmailAndPassword(auth, email, password);

                dispatch(fetchUserInfo(user))

                const userEmailRef = ref(storage, `UserEmail/${email}`);
                await uploadBytes(userEmailRef, new Uint8Array(0));

                //여기서부터 추가
                const salaryDocRef = doc(db, "users", "0vY0bqw8nKT7lGbiSotVrcVzZWs1", "salary", "data")
                await updateDoc(salaryDocRef, {
                    allUserInfo: arrayUnion({
                        name,
                        email,
                        userImg: userImg,
                        userBg: userBg,
                        phone,
                        position,
                        team,
                        shortInfo,
                        uid: user.uid,
                    })
                });
                setLoading(false)

            } catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false)
                dispatch(clearUserInfo())
            }
            setActiveStep((prev) => prev + 1)
        }
=======
  };

  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const isValidForm = checkForm();
    if (isValidForm) {
      try {
        setLoading(true);
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        dispatch(fetchUserInfo(user));
        dispatch(fetchProject());

        const userEmailRef = ref(storage, `UserEmail/${email}`);
        await uploadBytes(userEmailRef, new Uint8Array(0));

        //여기서부터 추가
        const salaryDocRef = doc(db, "users", "0vY0bqw8nKT7lGbiSotVrcVzZWs1", "salary", "data");
        await updateDoc(salaryDocRef, {
          allUserInfo: arrayUnion({
            name,
            email,
            userImg: userImg,
            userBg: userBg,
            phone,
            position,
            team,
            shortInfo,
            uid: user.uid,
          }),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        dispatch(clearUserInfo());
      }
      setActiveStep((prev) => prev + 1);
>>>>>>> feature/work
    }
  };

<<<<<<< HEAD
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
                        <img src={userBg ? userBg : mypageHeader} alt="" style={{ maxWidth: '668px', maxHeight: '150px' }} />
                        <div className="skeleton">
                            <Avatar $size="xl" src={userImg} style={{ borderRadius: '50%' }} />
                            <div className="skeleton__name"></div>
                            <div className="skeleton__info"></div>
                        </div>
                    </SampleMypage>
                </GridColumnSpan>
                <div>
                    <Input id="userImg" type="file" label="file1" labelText="Profile Image" onChange={handleUserImg} />
                    {errorMessage.userImg && (<FormText $error>{errorMessage.userImg}</FormText>)}
                </div>
                <div>
                    <Input id="userBg" type="file" label="file2" labelText="Mypage Background Image" onChange={handleUserBg} />
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
=======
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
      {loading && <Loading />}
      <SignHeader>
        <Heading size={"sm"} tag={"h2"}>
          사진 업로드
        </Heading>
        <p className="mb3">본인 인증을 위한 사진을 업로드하세요.</p>
      </SignHeader>
      <Grid $col="2" className="mb3">
        <GridColumnSpan $span="2">
          <SampleMypage>
            <img src={userBg ? userBg : mypageHeader} alt="" style={{ maxWidth: "668px", maxHeight: "150px" }} />
            <div className="skeleton">
              <Avatar $size="xl" src={userImg} style={{ borderRadius: "50%" }} />
              <div className="skeleton__name"></div>
              <div className="skeleton__info"></div>
>>>>>>> feature/work
            </div>
          </SampleMypage>
        </GridColumnSpan>
        <div>
          <Input id="userImg" type="file" label="file1" labelText="Profile Image" onChange={handleUserImg} />
          {errorMessage.userImg && <FormText $error>{errorMessage.userImg}</FormText>}
        </div>
        <div>
          <Input id="userBg" type="file" label="file2" labelText="Mypage Background Image" onChange={handleUserBg} />
          {errorMessage.userBg && <FormText $error>{errorMessage.userBg}</FormText>}
        </div>
      </Grid>
      <div className="align both">
        <Button $color="secondary" onClick={handlePrev}>
          이전
        </Button>
        <Button $color="primary" onClick={handleSubmit}>
          완료
        </Button>
      </div>
    </>
  );
};

export default JoinThird;
