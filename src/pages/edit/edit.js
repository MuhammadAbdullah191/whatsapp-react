import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/shared/Loader';
import { UserApi } from '../../apis/user/user';
import { setUser } from '../../store/slices/data';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLocalStorage } from '../../helpers/localStorage';
import { getAvatarUrl } from '../../helpers/avatarUrl';

function ProfileEdit() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.data.currentUser);
  const [username, setUsername] = useState(currentUser.username);
  const [status, setStatus] = useState(currentUser.status);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleRemovePhoto = () => {
    const confirmed = window.confirm('Are you sure you want to remove the photo?');
    if (confirmed) {
      UserApi.removeImage(currentUser.id).then((res) => {
        if (res.status === 200) {
          setLocalStorage('user',res.data.user)
          dispatch(setUser(res.data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      user: {
        username: username,
        status: status,
        avatar: selectedImage,
      },
    };

    UserApi.updateUser(currentUser.id, data)
      .then((res) => {
        if (res.status === 200) {
          setSelectedImage(null);
          setLocalStorage('user',res.data.user)
          dispatch(setUser(res.data.user));
          document.getElementById('imageInput').value = '';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (currentUser) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/">
            <i class="fa-solid fa-chevron-left text-black fs-2"></i>
          </Link>
          <h2 className="text-center">Edit Profile</h2>
          <p></p>
        </div>
        <div className="text-center mt-5">
          <img
            src={getAvatarUrl(currentUser)}
            alt="Profile Photo"
            className="rounded-circle mb-4 edit-img"
          />
          <div className="form-group d-flex align-items-center">
            <input
              type="file"
              id="imageInput"
              className="form-control me-2"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <button className="btn btn-secondary" onClick={handleRemovePhoto} disabled={!currentUser.avatar_url}>
              Remove Photo
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <input
            type="text"
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input type="text" id="phone" className="form-control" disabled value={currentUser.phone} />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default ProfileEdit;
