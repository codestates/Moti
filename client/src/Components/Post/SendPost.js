import  React  from "react";

function SendPost() {


    return (
        <div className="sendpost">
              <div className="sendpost__circlebox">
                 <div className="sendpost__circlebox__img"/>
              </div>
              <div className="sendpost__box">
                  <p> How are you today?</p>
              
                <form action="/action_page.php">
                    <label for="img">select your photo </label>
                    <input type="file" id="img" name="img" accept="image/*" />
                    <input type="submit" />
                </form>
                </div>
        </div>
   
    )
   
   
   }
   
   export default SendPost

              {/* <input
  id="upload-file"
  type="file"
  accept="image/*, video/*"
  multiple
//   onChange={uploadFile}
></input>
<label htmlFor="upload-file">파일선택</label> */}