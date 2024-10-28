"use client";
import { withApollo } from "@/apollo/withApollo";
import Container from "@/components/Container";
import DiarySearch from "@/components/Diary/DiarySearch";
import Loading from "@/components/Loading";
import DiaryStatistic from "@/components/Services/DiaryStatistic";
import { useDiaryQuery } from "@/gen/gql";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const { data, loading, refetch } = useDiaryQuery();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading || !data) {
    return (
      <Container className="d-flex jc-center ai-center">
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <div id="mainbar-full" className="user-show-new">
        <div id="main-content">
          <div className="d-flex gs24 md:fd-column">
            <div className="flex--item fl-grow1">
              <DiarySearch data={data!} loading={loading} />
            </div>
            <div className="flex--item3 fl-shrink0 md:order-last mt0">
              <DiaryStatistic data={data!} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withApollo({ ssr: false })(page);
