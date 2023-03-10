import React, {useContext, useEffect, useState} from "react";
import Email from "../../../components/forms/email";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../../contex/AuthContext";
import axios from "axios";
import {useQuery} from "react-query";
import {useImmer} from "use-immer";

const EtablissementForm = () => {

    const [etaInfo, setEtaInfo] = useImmer({idEta: '', nom: ''})
    const [programmesInfo, setProgrammesInfo] = useImmer([{idProgramme: '', nom: '', description: ''}])
    const {jwt} = useContext(AuthContext);
    let {idEta} = useParams();
    let navigate = useNavigate();
    const config = {
        headers: {Authorization: `Bearer ${jwt}`}
    };
    const getEtablissementById = () => {
        return axios.get(`http://localhost:8080/api/v1/etablissements/${idEta}`, config)
            .then(res => res.data)

    }

    const etaById = useQuery(
        "getEtablissementById",
        getEtablissementById
    )

    useEffect(() => (
        setEtaInfo(draft => {
            draft.idEta = idEta
            draft.nom = etaById.data?.nom
        })

    ), [etaById.isSuccess])

    useEffect(() => (

        setProgrammesInfo(draft => {
            while(draft.length > 0) {
                draft.pop();
            }
            etaById.data?.programmes.map(programme => (
                draft.push(programme)
            ))
        })


    ), [etaById.isSuccess])



    console.log(JSON.stringify(programmesInfo))

    return (
        <div>
            <div
                className="fixed  top-16 left-0 z-10 h-[4.5rem] w-full xl:ml-[15%] xl:w-[85%]  bg-white dark:bg-gray-800 shadow-md  px-4 py-2.5 flex justify-between">
                <button onClick={() => navigate(-1)}
                        className="bg-gray-200 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-700 p-2.5 px-6 rounded-xl font-semibold text-lg text-gray-900 dark:text-gray-400 shadow-sm">Annuler
                </button>
                <button
                    className="bg-main-500  hover:bg-main-600 active:bg-main-600 p-2.5 px-6 rounded-xl font-semibold text-lg text-white shadow-sm">Publier
                    les changements
                </button>
            </div>
            <form className="mt-[4.5rem] w-full grid w-full gap-4 p-2 scrollbar-hide place-items-start scrollbar-hide">
                <div className="bg-white dark:bg-gray-800 w-full rounded-2xl drop-shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white pb-3">Information de base:</h3>
                    <div className=" grid md:grid-cols-2">
                        <div>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label className="form-header">Nom</label>
                                    <textarea className="form-field resize-none" id="nom"
                                              placeholder="Marketing et Management" value={etaInfo.nom}/>
                                </div>
                                <div>
                                    <label className="form-header">Description</label>
                                    <textarea className="form-field resize-none" id="description"
                                              placeholder="Rabat buisiness school"/>
                                </div>
                            </div>
                        </div>
                        <div className="md:px-12">
                            <h6 className="px-4 p-2 mb-2 text-base font-semibold text-gray-900 dark:text-white">Tips:</h6>
                            <span className="text-sm font-medium text-gray-500/80 dark:text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel varius est, eu ornare ex. Mauris ultrices enim sed felis aliquet imperdiet. Nullam tincidunt at diam a interdum.</span>
                        </div>
                    </div>


                </div>
                <div className="bg-white dark:bg-gray-800  w-full rounded-2xl drop-shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white pb-3">Programmes:</h3>
                    {programmesInfo.map((programme) => (
                            <div className=" grid " key={programme.idProgramme}>
                                <div>
                                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                                        <div>
                                            <label className="form-header">Nom</label>
                                            <input type="text" className="form-field" id="first_name"
                                                   placeholder="Informatique et numerique" value={programme.nom}/>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="form-header">Description</label>
                                            <input type="text" className="form-field" id="last_name"
                                                   placeholder="ISI - SSI - Big Data" value={programme.description}/>
                                        </div>
                                        <div>
                                            <label className="hiden md:block mb-2 text-base font-semibold text-transparent">work
                                                smart not hard</label>
                                            <div className="flex flex-col md:flex-row gap-6 items-center mt-auto">
                                                <button
                                                    className="w-full md:w-auto bg-gray-200 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-700 p-2.5 px-6 rounded-xl font-semibold text-lg text-gray-900 dark:text-gray-400 shadow-sm">Supprimer
                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    )
                    }
                    <div className="flex justify-center">
                        <button
                            className="bg-secondary-500  hover:bg-secondary-600 active:bg-secondary-600 p-2.5 px-6 rounded-xl font-semibold text-lg text-white shadow-sm">Ajouter
                            nouveaux programme
                        </button>
                    </div>
                </div>
            </form>
        </div>


    )
};

export default EtablissementForm;