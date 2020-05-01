/** @jsx jsx */
import {jsx} from "@emotion/core";
import tw from "twin.macro";
import css from "@emotion/css/macro";
import React from "react";
import {
  useDmxFixtureRemoveMutation,
  useDmxFixtureSetChannelMutation,
  useDmxFixtureSetNameMutation,
  useDmxFixtureCreateMutation,
  useDmxFixtureSetTagsMutation,
  useDmxFixtureSetModeMutation,
  useDmxDevicesSubscription,
  useDmxFixtureSetDmxDeviceMutation,
  DmxFixtureMode,
  DmxFixture,
} from "generated/graphql";
import SearchableList from "helpers/SearchableList";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, Badge} from "reactstrap";
import {FaTimes} from "react-icons/fa";

const Tag: React.FC<{tag: string; onClick: () => void}> = ({tag, onClick}) => {
  return (
    <Badge>
      {tag}{" "}
      <FaTimes
        css={tw`cursor-pointer rounded-full hover:bg-gray-700 active:bg-gray-800`}
        onClick={onClick}
      />
    </Badge>
  );
};
const DMXFixtures: React.FC<{
  dmxFixtures: Omit<
    DmxFixture,
    "DMXDeviceId" | "simulatorId" | "class" | "passiveChannels"
  >[];
}> = ({dmxFixtures}) => {
  const {fixtureId, setId} = useParams();
  const navigate = useNavigate();
  const {data: deviceData} = useDmxDevicesSubscription();
  const [create] = useDmxFixtureCreateMutation();
  const [setName] = useDmxFixtureSetNameMutation();
  const [setChannel] = useDmxFixtureSetChannelMutation();
  const [remove] = useDmxFixtureRemoveMutation();
  const [setDevice] = useDmxFixtureSetDmxDeviceMutation();
  const [setMode] = useDmxFixtureSetModeMutation();
  const [setTags] = useDmxFixtureSetTagsMutation();

  const selectedFixture = dmxFixtures.find(d => d.id === fixtureId);

  const [channelError, setChannelError] = React.useState(false);
  const [tagInput, setTagInput] = React.useState("");
  React.useEffect(() => {
    setTagInput("");
    setChannelError(false);
  }, [fixtureId]);

  return (
    <React.Fragment>
      <div css={tw`flex flex-col`}>
        <h3>Devices</h3>
        <SearchableList
          items={dmxFixtures?.map(d => ({id: d.id, label: d.name})) || []}
          selectedItem={fixtureId || null}
          setSelectedItem={item =>
            navigate(`/config/dmx/sets/${setId}/${item}`)
          }
        ></SearchableList>
        <Input
          block
          type="select"
          color="success"
          value="nothing"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!setId) return;
            const name = prompt("What is the name of this DMX Fixture?");
            if (!name) return;
            create({
              variables: {dmxSetId: setId, dmxDeviceId: e.target.value, name},
            }).then(res =>
              navigate(
                `/config/dmx/sets/${setId}/${res.data?.dmxFixtureCreate || ""}`,
              ),
            );
          }}
        >
          <option value="nothing" disabled>
            Create DMX Fixture
          </option>
          {deviceData?.dmxDevices.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Input>
        {setId && selectedFixture && (
          <Button
            block
            color="danger"
            onClick={() => {
              remove({variables: {dmxSetId: setId, id: selectedFixture.id}});
              navigate(`/config/dmx/sets/${setId}`);
            }}
          >
            Remove DMX Fixture
          </Button>
        )}
      </div>
      <div css={tw`flex flex-col col-span-2`}>
        {selectedFixture && (
          <React.Fragment>
            <h3>{selectedFixture?.name}</h3>
            <label>
              Name
              <Input
                key={selectedFixture?.id}
                defaultValue={selectedFixture?.name}
                onChange={e =>
                  selectedFixture &&
                  setName({
                    variables: {id: selectedFixture.id, name: e.target.value},
                  })
                }
              />
            </label>
            <label>
              Channel
              <Input
                key={selectedFixture?.id}
                invalid={channelError}
                defaultValue={selectedFixture.channel}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  if (isNaN(val)) {
                    setChannelError(true);
                    return;
                  }
                  setChannelError(false);
                  setChannel({
                    variables: {id: selectedFixture.id, channel: val},
                  });
                }}
              />
              <small>
                This is the starting channel, configured on the physical DMX
                Device
              </small>
            </label>
            <label>
              DMX Device
              <Input
                type="select"
                value={selectedFixture.DMXDevice.id}
                onChange={e =>
                  setDevice({
                    variables: {
                      id: selectedFixture.id,
                      deviceId: e.target.value,
                    },
                  })
                }
              >
                {deviceData?.dmxDevices.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Input>
            </label>
            <label>
              Mode
              <Input
                type="select"
                value={selectedFixture.mode}
                onChange={e =>
                  setMode({
                    variables: {
                      id: selectedFixture.id,
                      mode: e.target.value as DmxFixtureMode,
                    },
                  })
                }
              >
                {Object.entries(DmxFixtureMode).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
              </Input>
            </label>
            <label>
              Tags
              <div
                css={css`
                  background-color: rgba(0, 0, 0, 0.7);
                  border: solid 1px rgba(255, 255, 255, 0.2);
                  color: white;
                  width: 100%;
                  min-height: calc(1.5em + 0.75rem + 2px);
                  padding: 0.375rem 0.75rem;
                  font-size: 1rem;
                  font-weight: 400;
                  line-height: 1.5;
                  border-radius: 0.25rem;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  * {
                    margin-left: 0.25rem;
                    margin-right: 0.25rem;
                  }
                  &:focus-within {
                    outline: 0;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                  }
                `}
              >
                {selectedFixture.tags.map(t => (
                  <Tag
                    tag={t}
                    onClick={() =>
                      setTags({
                        variables: {
                          id: selectedFixture.id,
                          newTags: selectedFixture.tags.filter(
                            tag => tag !== t,
                          ),
                        },
                      })
                    }
                  />
                ))}

                <input
                  css={css`
                    flex: 1;
                    height: 100%;
                    padding: 0;
                    margin: 0;
                    outline: 0;
                    border: none !important;
                    background: transparent !important;
                    min-width: 300px;
                  `}
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (
                      e.key === "," ||
                      e.key === "." ||
                      e.key === " " ||
                      e.key === "Enter"
                    ) {
                      e.preventDefault();
                      setTags({
                        variables: {
                          id: selectedFixture.id,
                          newTags: selectedFixture.tags
                            .concat(tagInput)
                            .filter((a, i, arr) => arr.indexOf(a) === i),
                        },
                      });
                      setTagInput("");
                    }
                    if (
                      (e.key === "Backspace" || e.key === "Delete") &&
                      tagInput === ""
                    ) {
                      e.preventDefault();
                      setTags({
                        variables: {
                          id: selectedFixture.id,
                          newTags: selectedFixture.tags.slice(0, -1),
                        },
                      });
                    }
                  }}
                />
              </div>
              <Button
                size="sm"
                color="success"
                onClick={() =>
                  setTags({
                    variables: {
                      id: selectedFixture.id,
                      newTags: selectedFixture.tags
                        .concat("main")
                        .filter((a, i, arr) => arr.indexOf(a) === i),
                    },
                  })
                }
              >
                Add Main Tag
              </Button>
              <Button
                size="sm"
                color="info"
                onClick={() =>
                  setTags({
                    variables: {
                      id: selectedFixture.id,
                      newTags: selectedFixture.tags
                        .concat("accent")
                        .filter((a, i, arr) => arr.indexOf(a) === i),
                    },
                  })
                }
              >
                Add Accent Tag
              </Button>
              <Button
                size="sm"
                color="secondary"
                onClick={() =>
                  setTags({
                    variables: {
                      id: selectedFixture.id,
                      newTags: selectedFixture.tags
                        .concat("work")
                        .filter((a, i, arr) => arr.indexOf(a) === i),
                    },
                  })
                }
              >
                Add Work Lights Tag
              </Button>
            </label>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default DMXFixtures;
