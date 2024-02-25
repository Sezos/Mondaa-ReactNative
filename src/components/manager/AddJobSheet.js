/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Button, Searchbar } from "react-native-paper";
import { COLOR_PALETTE, FONTS } from "../../utils/Constants";
import services from "../../services/service";

const AddJobSheet = (props) => {
    const { selectedProjects } = props.payload;
    const styles = useStyles();
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState(-1);

    const numberOfResults = 3;

    const onChangeSearch = (query) => setSearchQuery(query);

    useEffect(() => {
        _fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const result = projects
            ?.filter((project) =>
                project.name.startsWith(searchQuery.toLowerCase())
            )
            .slice(0, numberOfResults);
        setFilteredProjects(result);
    }, [searchQuery, projects]);

    const _fetch = async () => {
        const { data } = await services.getAllProjectLocation();
        setProjects(data.filter((p) => !selectedProjects.includes(p.id)));
    };

    const _handleSave = async () => {
        if (selected !== -1) {
            await SheetManager.hide(props.sheetId, {
                payload: filteredProjects[selected],
            });
        }
    };

    return (
        <ActionSheet
            id={props.sheetId}
            useBottomSafeAreaPadding={true}
            closable={true}
            drawUnderStatusBar={true}
            containerStyle={{ paddingHorizontal: 15 }}
            closeOnPressBack={true}
        >
            <View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    style={{ marginTop: 30 }}
                    value={searchQuery}
                />
                {filteredProjects.length > 0 ? (
                    <View>
                        {filteredProjects.map((project, idx) => {
                            return (
                                <View key={idx}>
                                    <Button
                                        onPress={() => {
                                            if (selected === idx) {
                                                setSelected(-1);
                                            } else {
                                                setSelected(idx);
                                            }
                                        }}
                                        style={{
                                            backgroundColor:
                                                selected === idx
                                                    ? "blue"
                                                    : "white",
                                        }}
                                    >
                                        {project.name}
                                    </Button>
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <View></View>
                )}
                <Button
                    mode="contained"
                    style={styles.button}
                    contentStyle={{ height: 45 }}
                    labelStyle={styles.buttonLabel}
                    textColor={COLOR_PALETTE.buttonTextColor}
                    buttonColor={COLOR_PALETTE.buttonColor}
                    onPress={_handleSave}
                >
                    Save
                </Button>
            </View>
        </ActionSheet>
    );
};

const useStyles = () => {
    return StyleSheet.create({
        button: {
            width: "75%",
            borderRadius: 10,
            alignSelf: "center",
            marginVertical: 30,
        },
        buttonLabel: {
            fontSize: 13,
            fontFamily: FONTS.bold,
        },
        input: {
            width: "100%",
            alignSelf: "center",
            backgroundColor: "transparent",
            fontSize: 14,
            fontFamily: FONTS.regular,
        },
    });
};

export default AddJobSheet;
