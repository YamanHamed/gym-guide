import { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { fetchTips } from "../../store/slices/tipsSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorTag from "../../components/ErrorTag";
import SkeletonCard from "../../components/SkeletonCard";
import FilterBar from "../../components/FilterBar";
import Hr from "../../components/Hr";
const layoutMap = [
  "md:col-span-2", // 0: The Anchor (Wide Left)
  "md:col-span-1", // 1: Technical Detail
  "md:col-span-1", // 2: Technical Detail
  "md:col-span-1", // 3: Technical Detail
  "md:col-span-1", // 4: Technical Detail
  "md:col-span-2", // 5: The Mid-Point Feature (Wide Right)
  "md:col-span-1", // 6: Final Technical Spec
];

const Tips = () => {
  // == GENERAL
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.tips);

  // == FETCH TIPS
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTips());
    }
  }, [status, dispatch]);

  // == TIPS FILTERING ==
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const normalize = (str) => str?.toLowerCase().replace(/[\s-]/g, "") || ""; // Helper to normalize strings for flexible comparison
  const filteredTips = useMemo(() => {
    // If "All" is selected (and it's the only one or explicitly included), show all
    if (selectedFilters.includes("All")) return list;

    // Otherwise, filter tips where the normalized tag matches any selected filter
    return list.filter((tip) =>
      selectedFilters.some(
        (filter) => normalize(tip.tag) === normalize(filter),
      ),
    );
  }, [list, selectedFilters]);

  return (
    <>
      <Header
        className="mb-16"
        pageHeader={true}
        plainTitle="EXERCISES"
        highlightTitle="LIBRARY"
        subTitle="Optimize Every Rep"
        body="Scientific progression starts with technical mastery. Select a target area to initialize protocols."
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
        titleSize="text-5xl md:text-7xl"
        bodyClassName="max-w-[280px]"
      />
      <Hr />
      <Header
        className="mb-16"
        plainTitle="TIPS"
        highlightTitle=" & INSIGHTS "
        body="Your go-to resource for expert tips and insights on training, nutrition, and recovery. Whether you're a beginner or a seasoned athlete, our tips are designed to help you optimize your fitness journey and achieve your goals."
      />
      <FilterBar
        filters={["All", "Exercises", "Splits", "Nutrition "]}
        value={selectedFilters}
        onChange={setSelectedFilters}
      />

      {status === "loading" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonCard
              key={idx}
              className={`${layoutMap[idx % layoutMap.length]} flex flex-col h-full`}
            />
          ))}
        </div>
      )}
      {status === "failed" && <ErrorTag error={error} />}
      {status === "succeeded" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
          {filteredTips.map((tip, i) => (
            <Card
              key={tip._id || i}
              tag={tip.tag && `[ ${tip.tag} ]`}
              title={tip.title}
              body={tip.content}
              icon={tip.icon || "fitness_center"}
              className={`${layoutMap[i % layoutMap.length]} flex flex-col h-full`}
              links={tip.links}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Tips;
