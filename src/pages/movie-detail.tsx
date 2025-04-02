import { useParams } from "react-router-dom";

export default function MovieDetail() {
    const { movieId } = useParams();

    return (
        <div className="p-8 text-center text-2xl font-bold">
          📽️ 영화 상세 페이지 - ID: {movieId}
        </div>
      );
}