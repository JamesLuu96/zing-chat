import React, { useState } from "react";
import AppendImage from "../../components/AppendImage";
function Upload() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sr7fqd9x");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dafa689fe/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLoading(false);
  };
  return (
    <div style={{ marginLeft: "30px" }}>
      <input type="file" name="file" onChange={uploadImage} />

      {loading ? (
        <h3>loading...</h3>
      ) : (
        <img src={image} style={{ width: "200px" }} />
      )}
    </div>
  );
}

export default Upload;
