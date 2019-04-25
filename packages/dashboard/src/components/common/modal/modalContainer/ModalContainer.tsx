// Copyright 2019 Superblocks AB
//
// This file is part of Superblocks Lab.
//
// Superblocks Lab is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Lab is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Lab.  If not, see <http://www.gnu.org/licenses/>.

import React, {Component} from 'react';
import style from './style.less';
import Loadable from 'react-loadable';
import { Loading } from '../../loadable';

const DeleteProjectModal = Loadable({
    loader: () => import(/* webpackChunkName: "DeleteProjectModal" */'../../../modals/deleteProjectModal'),
    loading: Loading,
});

const DeleteOrganizationModal = Loadable({
    loader: () => import(/* webpackChunkName: "DeleteOrganizationModal" */'../../../modals/deleteOrganizationModal'),
    loading: Loading,
});


interface IProps {
    modalType: string;
    modalProps: any;
    hideModal: () => void;
}

const MODAL_COMPONENTS: any = {
    DELETE_PROJECT_MODAL: DeleteProjectModal,
    DELETE_ORGANIZATION_MODAL: DeleteOrganizationModal
    /* other modals */
};

export class ModalContainer extends Component<IProps> {

    constructor(props: IProps) {
        super(props);

        window.addEventListener(
            'keydown',
            (e) => {
                // Hide modal with escape button
                if ( e.keyCode === 27 ) {
                    e.preventDefault();
                    props.hideModal();
                }
            },
            false
        );
    }

    render() {
        const { modalType, modalProps, hideModal } = this.props;

        if (!modalType) {
            return null;
        }

        const SpecificModal: any = MODAL_COMPONENTS[modalType];

        return (
            <div className={style.modalContainer}>
                <SpecificModal hideModal={hideModal} {...modalProps} />
            </div>
        );
    }
}

