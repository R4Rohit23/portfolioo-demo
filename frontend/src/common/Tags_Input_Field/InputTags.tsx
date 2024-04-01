import { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./input_tag.css";
import { ArtistData } from "../../interfaces/UserData";
import toast from "react-hot-toast";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface IInputTags {
    data: ArtistData;
    setData: (value: any) => void;
}

export const InputTags = (props: IInputTags) => {
    const { data, setData } = props;
    const [tags, setTags] = useState([]);
    const [resTags, setResTags] = useState([]);

    useEffect(() => {}, []);
    const tagsLimit = 10;

    const handleDelete = (i) => {
        setTags(tags.filter((text, index) => index !== i));

        setResTags(resTags.filter((text, index) => index !== i));

        setData({
            ...data,
            skills: resTags.filter((tag, index) => index !== i),
        });
    };

    const handleAddition = (tag) => {
        if (data.skills && data.skills.length >= tagsLimit) {
            return toast.error("You can add at most 10 skills");
        }

        setTags([...tags, tag]);

        setResTags([...resTags, tag.text]);

        setData({
            ...data,
            skills: [...resTags, tag.text],
        });
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        var tempTags = newTags.map((tag) => tag.text);
        // // re-render
        setTags(newTags);

        setData({
            ...data,
            skills: tempTags,
        });
    };

    return (
        <div id="tags">
            <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
            />
        </div>
    );
};
