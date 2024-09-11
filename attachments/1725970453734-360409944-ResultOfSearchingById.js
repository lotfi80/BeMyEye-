import { dataFetcher } from "../domain/apiClient";
// import "../../styles/index.scss";
import { useEffect, useState } from "react";
import { IMG_URL } from "../domain/apiClient";

export const ResultOfSearchingById = (id) => {
  const [data, setData] = useState({});
  const [rating, setRating] = useState("");
  const [casting, setCasting] = useState([]);

  useEffect(() => {
    const Fetcher = async () => {
      const data = await dataFetcher(`tv/${id}?`);
      const ratingData = await dataFetcher(`tv/${id}/content_ratings?`);
      const castData = await dataFetcher(`tv/${id}/aggregate_credits?`);
      setData(data);
      setRating(ratingData?.results?.[0]?.rating);
      setCasting(castData?.cast?.slice(0, 15));
    };
    Fetcher();
  }, [id]);

  const tv = {
    id: data?.id,
    name: data?.name,
    date: `${data?.first_air_date?.substring(
      0,
      4
    )} - ${data?.last_air_date?.substring(0, 4)}`,
    image: `${IMG_URL}${data?.poster_path}`,
    creator: data?.created_by?.[0]?.name,
    episodeRuntime: data?.episode_run_time,
    genres: data?.genres?.map((genre) => genre?.name) || [],
    inProduction: data?.in_production,
    nextEpisode: data?.next_episode_to_air,
    numberOfEpisodes: data?.number_of_episodes,
    numberOfSeasons: data?.number_of_seasons,
    overview: data?.overview,
    poster_path: data?.poster_path,
    statusbar: data?.status,
    voteAverage: data?.vote_average?.toFixed(1),
    voteCount: data?.vote_count,
    tagline: data?.tagline,
    rating: rating,
    cast: casting?.map((actor) => ({
      name: actor?.name,
      image: actor?.profile_path,
    })),

    nextEpisode: {
      airDate: data?.next_episode_to_air?.air_date,
      seasonNumber: data?.next_episode_to_air?.season_number,
      episodeNumber: data?.next_episode_to_air?.episode_number,
      name: data?.next_episode_to_air?.name,
    },

    seasons: data?.seasons?.map((season) => ({
      name: season?.name,
      episodeCount: season?.episode_count,
      seasonNumber: season?.season_number,
      posterPath: `${IMG_URL}${season?.poster_path}`,
      overview: season?.overview,
    })),
  };

  return tv;
};
