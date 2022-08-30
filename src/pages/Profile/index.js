import React, {useState, useContext} from "react";
import './profile.css';
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import firebase from "../../services/firebaseConnection";

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);
  const [ name, setName ] = useState(user && user.name);
  const [ email, setEmail ] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
      } else {
        alert('Please load one image of type png or jpeg to continue.');
        return null;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    const uploadTask = await firebase.storage()
      .ref(`images/${currentUid}/${imageAvatar.name}`)
      .put(imageAvatar)
      .then( async () => {
        console.log('Photo sent with success.');

        await firebase.storage().ref(`images/${currentUid}`)
        .child(imageAvatar.name).getDownloadURL()
        .then(async (url) => {
          let urlPhoto = url;

          await firebase.firestore().collection('users')
          .doc(user.uid)
          .update({
            avatarUrl: urlPhoto,
            name: name
          })
          .then(() => {
            let data = {
              ...user,
              avatarUrl: urlPhoto,
              name: name
            };
            setUser(data);
            storageUser(data);
          })
        })
      })
      .catch((error) => {
      console.log('ops imagem nao salvou', error)
    })
  }

  async function handleSave(e) {
    e.preventDefault();
    if (imageAvatar === null && name !== '') {
      await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          name: name
        })
        .then(() => {
          let data = {
            ...user,
            name: name
          }
          setUser(data);
          storageUser(data);
      })
    }
    else if (name !== '' && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="My profile">
        <FiSettings fontSize={25}/>
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="FFF" fontSize={25}/>
              </span>
              <input type="file" accept="image/*" onChange={handleFile} /><br />
              {avatarUrl === null
                ? <img widht="250" height="250" src={avatar} alt='avatar' />
                : <img widht="250" height="250" src={avatarUrl} alt='avatar' />
            }
            </label>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input type="text" value={email} disabled={true} />
            <button type="submit">Save</button>
           </form>
        </div>
        <div className="container">
          <button className="logout-btn" onClick={()=>signOut()}>Logout</button>
        </div>
      </div>
    </div>
  );
}
