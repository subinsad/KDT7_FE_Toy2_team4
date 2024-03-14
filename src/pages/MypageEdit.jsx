import { useNavigate } from "react-router-dom";
import { Button, FormText, Grid } from "../components/GlobalStyles";
import Select from "../components/Select";
import Input from "../components/Input";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import MypageHeader from "./MypageHeader";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { editUserBg, editUserImg, editUserInfo } from "../store/user.slice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const optionTeam = [
  {
    value: "기획팀",
    text: "기획팀",
  },
  {
    value: "개발팀",
    text: "개발팀",
  },
  {
    value: "디자인팀",
    text: "디자인팀",
  },
  {
    value: "운영팀",
    text: "운영팀",
  },
];
const optionPosition = [
  {
    value: "default",
    text: "직급 선택",
  },
  {
    value: "인턴",
    text: "인턴",
  },
  {
    value: "사원",
    text: "사원",
  },
  {
    value: "대리",
    text: "대리",
  },
  {
    value: "과장",
    text: "과장",
  },
  {
    value: "팀장",
    text: "팀장",
  },
];
const MypageEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const Back = () => {
    navigate("/mypage");
  };
  const { name, team, position, phone, shortInfo } = useSelector((state) => state.userSlice.userInfo)

  const [formData, setFormData] = useState({
    team: team || "",
    position: position || "",
    phone: phone || "",
    shortInfo: shortInfo || "",
    userImg: "",
    userBg: ""
  })

  const [errorMessage, setErrorMessage] = useState({
    team: "",
    position: "",
    phone: "",
    shortInfo: "",
    userImg: "",
    userBg: "",
  })
  const [loading, setLoading] = useState(false)


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  const handleUserImg = async (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        userImg: file,
      }));
    }
  }

  const handleUserBg = async (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        userBg: file,
      }));
    }
  }

  const checkForm = () => {
    let isValid = true;
    if (!formData.team) {
      setErrorMessage((prevData) => ({
        ...prevData,
        team: "팀을 선택해주세요."
      }));
      isValid = false;
    }
    if (!formData.position) {
      setErrorMessage((prevData) => ({
        ...prevData,
        position: "직급을 선택해주세요."
      }));
      isValid = false;
    }
    if (!formData.phone) {
      setErrorMessage((prevData) => ({
        ...prevData,
        phone: "핸드폰 번호를 입력해주세요."
      }));
      isValid = false;
    }
    else if (!/^[0-9-]*$/.test(formData.phone)) {
      setErrorMessage((prevData) => ({
        ...prevData,
        phone: "숫자만 입력해주세요."
      }));
      isValid = false;
    }
    if (!formData.shortInfo) {
      setErrorMessage((prevData) => ({
        ...prevData,
        shortInfo: "한 줄 소개를 입력해주세요."
      }));
      isValid = false;
    }
    return isValid;
  }

  const onSubmit = async () => {
    const isValidForm = checkForm();
    if (isValidForm) {
      try {
        setLoading(true)
        const user = auth.currentUser
        const userDocRef = doc(db, "users", user.uid, "userInfo", "data")

        await setDoc(userDocRef, {
          phone: formData.phone,
          position: formData.position,
          shortInfo: formData.shortInfo,
          team: formData.team,
        }, { merge: true });

        dispatch(editUserInfo({
          phone: formData.phone,
          position: formData.position,
          shortInfo: formData.shortInfo,
          team: formData.team,
        }))

        if (formData.userImg) {
          const imgLocationRef = ref(storage, `UserImage/${name}`);
          const imgResult = await uploadBytes(imgLocationRef, formData.userImg);
          const userImgUrl = await getDownloadURL(imgResult.ref);
          await setDoc(userDocRef, {
            userImg: userImgUrl
          }, { merge: true });
          dispatch(editUserImg(userImgUrl))
        }

        if (formData.userBg) {
          const bgLocationRef = ref(storage, `UserBg/${name}`);
          const bgResult = await uploadBytes(bgLocationRef, formData.userBg);
          const userBgUrl = await getDownloadURL(bgResult.ref);
          await setDoc(userDocRef, {
            userBg: userBgUrl
          }, { merge: true });
          dispatch(editUserBg(userBgUrl))
        }

        //여기서부터 추가
        const salaryDocRef = doc(db, "users", "0vY0bqw8nKT7lGbiSotVrcVzZWs1", "salary", "data");
        const salaryDocSnapshot = await getDoc(salaryDocRef);
        const allUserInfo = salaryDocSnapshot.data().allUserInfo;

        // 특정 uid를 가진 사용자를 찾아서 정보 업데이트
        const userIndex = allUserInfo.findIndex(info => info.uid === user.uid);
        if (userIndex !== -1) {
          allUserInfo[userIndex] = {
            ...allUserInfo[userIndex],
            phone: formData.phone,
            position: formData.position,
            shortInfo: formData.shortInfo,
            team: formData.team,
          };
        }

        await updateDoc(salaryDocRef, { allUserInfo });

        navigate('/mypage')
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage((prevMessages) => ({
        ...prevMessages,
        team: "",
        position: "",
        phone: "",
        shortInfo: "",
        userImg: "",
        userBg: "",
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      {loading && (<Loading />)}
      <MypageHeader className="mb3" />

      <Card title={"회원정보수정"}>
        <Grid $col="2" className="mb5">
          <div>
            <Select id="team" options={optionTeam} label="team" labelText="Team" defaultValue={formData.team} onChange={handleChange} />
            {errorMessage.team && (<FormText $error>{errorMessage.team}</FormText>)}
          </div>
          <div>
            <Select id="position" options={optionPosition} label="position" labelText="Job Position" defaultValue={formData.position} onChange={handleChange} />
            {errorMessage.position && (<FormText $error>{errorMessage.position}</FormText>)}
          </div>
          <div>
            <Input id="phone" type="tel" label="phone" labelText="Phone" placeholder="000-0000-0000" defaultValue={formData.phone} onChange={handleChange} />
            {errorMessage.phone && (<FormText $error>{errorMessage.phone}</FormText>)}
          </div>
          <div>
            <Input id="shortInfo" type="text" label="shortInfo" labelText="Short Words" placeholder="프로필 한줄 소개" defaultValue={formData.shortInfo} onChange={handleChange} />
            {errorMessage.shortInfo && (<FormText $error>{errorMessage.shortInfo}</FormText>)}
          </div>
          <div>
            <Input type="file" label="file1" labelText="Profile Image" onChange={handleUserImg} />
            {errorMessage.userImg && (<FormText $error>{errorMessage.userImg}</FormText>)}
          </div>
          <div>
            <Input type="file" label="file2" labelText="Mypage Background Image" onChange={handleUserBg} />
            {errorMessage.userBg && (<FormText $error>{errorMessage.userBg}</FormText>)}
          </div>
        </Grid>
        <div className="align">
          <Button $color={"primary"} className="mr2" onClick={onSubmit}>
            회원정보수정
          </Button>
          <Button $color={"secondary"} onClick={Back}>
            취소
          </Button>
        </div>
      </Card>
    </>
  );
};

export default MypageEdit;
