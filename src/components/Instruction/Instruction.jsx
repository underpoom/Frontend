import "./Instruction.css";

export const Instruction = ({ className, ...props }) => {
    return (
        <div className={"instruction " + className}>
            <svg
                className="file-space"
                width="738"
                height="485"
                viewBox="0 0 738 485"
                fill="white"
               strokeWidth="2"
                stroke="black"

            >
                <path
                    d="M8 -1C3.02944 -1 -1 3.02945 -1 8.00001V477C-1 481.971 3.02945 486 8.00001 486H730C734.971 486 739 481.971 739 477V8C739 3.02944 734.971 -1 730 -1H8Z"
                   
                    
                    
                />
            </svg>
            <div className="instruction2">Instruction </div>
            <div className="button">
                <div className="rectangle-1704"></div>
                <div className="new-factory">Back </div>
            </div>
            <div className="frame-352">
                <div className="rectangle-17042"></div>
                <div className="contact-admin">Contact Admin </div>
            </div>
            <div className="frame-353">
                <div className="rectangle-17043"></div>
                <div className="how-to-collect-and-upload-video">
                    How to collect and upload video{" "}
                </div>
            </div>
            <div className="frame-372">
                <div className="ellipse-2"></div>
                <img className="image-19" src="image-190.png" />
            </div>
            <div className="frame-371">
                <div className="ellipse-2"></div>
                <img className="image-20" src="image-200.png" />
            </div>
        </div>
    );
};
